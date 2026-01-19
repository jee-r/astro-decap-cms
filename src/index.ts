import type { AstroIntegration } from 'astro';
import { spawn } from 'node:child_process';
import type { DecapCMSOptions } from './types.js';
import AdminDashboard from './vite-plugin-admin-dashboard.js';

// Re-export types for users
export type { DecapCMSOptions, CmsConfig, CMS } from './types.js';

const widgetPath = '@jee-r/astro-decap-cms/identity-widget';

/**
 * Creates an Astro integration for Decap CMS.
 *
 * @param options - Configuration options for the Decap CMS integration
 * @returns An Astro integration that adds Decap CMS to your project
 */
export default function DecapCMS({
  disableIdentityWidgetInjection = false,
  adminPath = '/admin',
  cmsVersion = '3.10.0',
  config: cmsConfig,
  previewStyles = [],
}: DecapCMSOptions) {
  if (!adminPath.startsWith('/')) {
    throw new Error(
      `'adminPath' option must be a root-relative pathname, starting with "/", got "${adminPath}"`
    );
  }
  if (adminPath.endsWith('/')) {
    adminPath = adminPath.slice(0, -1);
  }

  let proxy: ReturnType<typeof spawn>;

  const DecapCMSIntegration: AstroIntegration = {
    name: 'decap-cms',
    hooks: {
      'astro:config:setup': ({
        config,
        injectRoute,
        injectScript,
        updateConfig,
      }) => {
        const identityWidgetScript = `import { initIdentity } from '${widgetPath}'; initIdentity('${adminPath}');`;
        updateConfig({
          // Default to the URL provided by Netlify when building there. See:
          // https://docs.netlify.com/configure-builds/environment-variables/#deploy-urls-and-metadata
          site: config.site || process.env.URL,
          vite: {
            plugins: [
              AdminDashboard({
                cmsVersion,
                config: cmsConfig,
                previewStyles,
                identityWidget: disableIdentityWidgetInjection
                  ? identityWidgetScript
                  : '',
              }),
            ],
          },
        });

        injectRoute({
          pattern: adminPath,
          entrypoint: '@jee-r/astro-decap-cms/admin-dashboard.astro',
        });

        if (!disableIdentityWidgetInjection) {
          injectScript('page', identityWidgetScript);
        }
      },

      'astro:server:start': () => {
        proxy = spawn('decap-server', {
          stdio: 'inherit',
          // Run in shell on Windows to make sure the npm package can be found.
          shell: process.platform === 'win32',
        });
        process.on('exit', () => proxy.kill());
      },

      'astro:server:done': () => {
        proxy.kill();
      },
    },
  };
  return DecapCMSIntegration;
}

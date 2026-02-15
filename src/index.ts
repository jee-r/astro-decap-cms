import type { AstroIntegration } from 'astro';
import type { CMSOptions } from './types.js';
import AdminDashboard from './vite-plugin-admin-dashboard.js';

// Re-export types for users
export type { CMSOptions, CmsType, CmsConfig, CMS } from './types.js';

const widgetPath = '@jee-r/astro-decap-cms/identity-widget';

/**
 * Creates an Astro integration for Decap CMS or Sveltia CMS.
 *
 * @param options - Configuration options for the CMS integration
 * @returns An Astro integration that adds the CMS to your project
 */
export default function CMS({
  cmsType = 'decap',
  disableIdentityWidgetInjection = false,
  adminPath = '/admin',
  cmsVersion,
  config: cmsConfig,
  previewStyles = [],
}: CMSOptions) {
  if (!adminPath.startsWith('/')) {
    throw new Error(
      `'adminPath' option must be a root-relative pathname, starting with "/", got "${adminPath}"`
    );
  }
  if (adminPath.endsWith('/')) {
    adminPath = adminPath.slice(0, -1);
  }

  // Sveltia CMS does not use Netlify Identity Widget
  if (cmsType === 'sveltia') {
    disableIdentityWidgetInjection = true;
  }

  const CMSIntegration: AstroIntegration = {
    name: 'astro-cms',
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
                cmsType,
                cmsVersion: cmsVersion || '',
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
        // Only start the proxy server for Decap CMS
        if (cmsType === 'decap') {
          // @ts-ignore - Import decap-server to start the proxy server
          import('decap-server');
        }
      },
    },
  };
  return CMSIntegration;
}

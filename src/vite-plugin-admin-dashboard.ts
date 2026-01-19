import type { CmsConfig } from 'decap-cms-core';
import type { Plugin } from 'vite';
import type { PreviewStyle } from './types';
import { getDecapCmsJs, resolveVersion } from './cache.js';

const virtualModuleId = 'virtual:astro-decap-cms/user-config';
const resolvedVirtualModuleId = '\0' + virtualModuleId;

function generateVirtualConfigModule({
  config,
  previewStyles = [],
  identityWidget,
}: {
  config: CmsConfig;
  previewStyles: Array<string | [string] | [string, { raw: boolean }]>;
  identityWidget: string;
}) {
  const imports: string[] = [];
  const styles: string[] = [];

  previewStyles.forEach((entry, index) => {
    if (!Array.isArray(entry)) entry = [entry];
    const [style, opts] = entry;
    if (opts?.raw || style.startsWith('http')) {
      styles.push(JSON.stringify([style, opts]));
    } else {
      const name = `style__${index}`;
      imports.push(`import ${name} from '${style}?raw';`);
      styles.push(`[${name}, { raw: true }]`);
    }
  });

  return `${imports.join('\n')}
${identityWidget}
export default {
  config: JSON.parse('${JSON.stringify(config)}'),
  previewStyles: [${styles.join(',')}],
};
`;
}

export default function AdminDashboardPlugin({
  cmsVersion,
  config,
  previewStyles,
  identityWidget,
}: {
  cmsVersion: string;
  config: Omit<CmsConfig, 'load_config_file' | 'local_backend'>;
  previewStyles: PreviewStyle[];
  identityWidget: string;
}): Plugin {
  const version = resolveVersion(cmsVersion);
  let decapCmsContent: string | undefined;
  let rootDir: string;

  return {
    name: 'vite-plugin-decap-cms-admin-dashboard',

    config(_, { command }) {
      // Dynamically set local_backend based on dev/build mode
      (config as CmsConfig).local_backend = command === 'serve';
      // Don't try to load config.yml
      (config as CmsConfig).load_config_file = false;
    },

    configResolved(resolvedConfig) {
      // Get the root directory of the user's project
      rootDir = resolvedConfig.root;
    },

    async buildStart() {
      // Fetch/cache the decap-cms.js file at build start
      if (!decapCmsContent) {
        decapCmsContent = await getDecapCmsJs(rootDir, version);
      }
    },

    async configureServer(server) {
      // Fetch/cache the decap-cms.js file on server start
      if (!decapCmsContent) {
        decapCmsContent = await getDecapCmsJs(rootDir, version);
      }

      // Serve it at /_decap-cms/decap-cms.js
      server.middlewares.use('/_decap-cms/decap-cms.js', (_req, res) => {
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        res.end(decapCmsContent);
      });
    },

    resolveId(id) {
      if (id === '/_decap-cms/decap-cms.js') {
        return id;
      }
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },

    async load(id) {
      if (id === '/_decap-cms/decap-cms.js') {
        // Return the cached content for build
        if (!decapCmsContent) {
          decapCmsContent = await getDecapCmsJs(rootDir, version);
        }
        return decapCmsContent;
      }
      if (id === resolvedVirtualModuleId)
        return generateVirtualConfigModule({
          config,
          previewStyles,
          identityWidget,
        });
    },

    async generateBundle() {
      // Emit the decap-cms.js file as a static asset during build
      if (!decapCmsContent) {
        decapCmsContent = await getDecapCmsJs(rootDir, version);
      }
      this.emitFile({
        type: 'asset',
        fileName: '_decap-cms/decap-cms.js',
        source: decapCmsContent,
      });
    },
  };
}

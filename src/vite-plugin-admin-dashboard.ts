import type { CmsConfig } from 'decap-cms-core';
import type { Plugin } from 'vite';
import type { CmsType, PreviewStyle } from './types';
import { getCmsJs, resolveVersion } from './cache.js';

const virtualModuleId = 'virtual:astro-cms/user-config';
const resolvedVirtualModuleId = '\0' + virtualModuleId;

function generateVirtualConfigModule({
  cmsType,
  config,
  previewStyles = [],
  identityWidget,
}: {
  cmsType: CmsType;
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
  cmsType: ${JSON.stringify(cmsType)},
  config: ${JSON.stringify(config)},
  previewStyles: [${styles.join(',')}],
};
`;
}

export default function AdminDashboardPlugin({
  cmsType,
  cmsVersion,
  config,
  previewStyles,
  identityWidget,
}: {
  cmsType: CmsType;
  cmsVersion: string;
  config: Omit<CmsConfig, 'load_config_file' | 'local_backend'>;
  previewStyles: PreviewStyle[];
  identityWidget: string;
}): Plugin {
  const version = resolveVersion(cmsVersion, cmsType);
  let cmsContent: string | undefined;
  let rootDir: string;

  return {
    name: 'vite-plugin-cms-admin-dashboard',

    config(_, { command }) {
      // Dynamically set local_backend based on dev/build mode (only for Decap CMS)
      if (cmsType === 'decap') {
        (config as CmsConfig).local_backend = command === 'serve';
      }
      // Don't try to load config.yml
      (config as CmsConfig).load_config_file = false;
    },

    configResolved(resolvedConfig) {
      rootDir = resolvedConfig.root;
    },

    async buildStart() {
      if (!cmsContent) {
        cmsContent = await getCmsJs(rootDir, version, cmsType);
      }
    },

    async configureServer(server) {
      if (!cmsContent) {
        cmsContent = await getCmsJs(rootDir, version, cmsType);
      }

      server.middlewares.use('/_cms/cms.js', (_req, res) => {
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        res.end(cmsContent);
      });
    },

    resolveId(id) {
      if (id === '/_cms/cms.js') {
        return id;
      }
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },

    async load(id) {
      if (id === '/_cms/cms.js') {
        if (!cmsContent) {
          cmsContent = await getCmsJs(rootDir, version, cmsType);
        }
        return cmsContent;
      }
      if (id === resolvedVirtualModuleId)
        return generateVirtualConfigModule({
          cmsType,
          config,
          previewStyles,
          identityWidget,
        });
    },

    async generateBundle() {
      if (!cmsContent) {
        cmsContent = await getCmsJs(rootDir, version, cmsType);
      }
      this.emitFile({
        type: 'asset',
        fileName: '_cms/cms.js',
        source: cmsContent,
      });
    },
  };
}

import type { CmsConfig, CMS } from 'decap-cms-core';

// Re-export for convenience
export type { CmsConfig, CMS };

export type NormalizedPreviewStyle =
  | [pathOrUrl: string]
  | [rawCSS: string, meta: { raw: boolean }];

export type PreviewStyle = string | NormalizedPreviewStyle;

export interface InitCmsOptions {
  cms: CMS; // window.CMS from global decap-cms.js
  config: CmsConfig;
  previewStyles?: NormalizedPreviewStyle[];
}

export interface DecapCMSOptions {
  /**
   * Path at which the Decap CMS admin dashboard should be served.
   * @default '/admin'
   */
  adminPath?: string;
  /**
   * Version of Decap CMS to use.
   * Supports exact versions ('3.10.0'), semver ranges ('^3.0.0'), or 'latest'.
   * @default '3.10.0'
   */
  cmsVersion?: string;
  config: Omit<CmsConfig, 'load_config_file' | 'local_backend'>;
  disableIdentityWidgetInjection?: boolean;
  previewStyles?: PreviewStyle[];
}

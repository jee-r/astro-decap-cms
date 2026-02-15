import type { CmsConfig, CMS } from 'decap-cms-core';

// Re-export for convenience
export type { CmsConfig, CMS };

export type CmsType = 'decap' | 'sveltia';

export type NormalizedPreviewStyle =
  | [pathOrUrl: string]
  | [rawCSS: string, meta: { raw: boolean }];

export type PreviewStyle = string | NormalizedPreviewStyle;

export interface InitCmsOptions {
  cms: CMS; // window.CMS from global decap-cms.js or sveltia-cms.js
  cmsType: CmsType;
  config: CmsConfig;
  previewStyles?: NormalizedPreviewStyle[];
}

export interface CMSOptions {
  /**
   * Which CMS to use.
   * @default 'decap'
   */
  cmsType?: CmsType;
  /**
   * Path at which the CMS admin dashboard should be served.
   * @default '/admin'
   */
  adminPath?: string;
  /**
   * Version of the CMS to use.
   * Supports exact versions ('3.10.0'), semver ranges ('^3.0.0'), or 'latest'.
   * @default '3.10.0' for Decap CMS, 'latest' for Sveltia CMS
   */
  cmsVersion?: string;
  config: Omit<CmsConfig, 'load_config_file' | 'local_backend'>;
  /**
   * Disable Netlify Identity Widget injection on all pages.
   * Automatically set to true for Sveltia CMS.
   * @default false
   */
  disableIdentityWidgetInjection?: boolean;
  previewStyles?: PreviewStyle[];
}

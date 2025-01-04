import type { CmsConfig } from 'decap-cms-core';

export type { CmsConfig };

export type DecapCMSConfig = Omit<CmsConfig, 'load_config_file' | 'local_backend'>;

export interface DecapCMSOptions {
	/**
	 * Path at which the Netlify CMS admin dashboard should be served.
	 * @default '/admin'
	 */
	adminPath?: string;
	config: DecapCMSConfig;
	/**
	 * Inject Netlify Identity script to page
	 * @default false
	 */
	disableIdentityWidgetInjection?: boolean;
	previewStyles?: PreviewStyle[];
}

export interface VirtualModuleConfig {
	config: CmsConfig;
	previewStyles: Array<PreviewStyle>;
	identityWidget: boolean;
}
export type NormalizedPreviewStyle =
	| [pathOrUrl: string]
	| [rawCSS: string, meta: { raw: boolean }];

export type PreviewStyle = string | NormalizedPreviewStyle;

export interface InitCmsOptions {
	config: CmsConfig;
	previewStyles?: NormalizedPreviewStyle[];
}
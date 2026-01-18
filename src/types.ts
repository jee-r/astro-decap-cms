import type CMS from 'decap-cms-app';
import type { CmsConfig } from 'decap-cms-core';

export type NormalizedPreviewStyle =
  | [pathOrUrl: string]
  | [rawCSS: string, meta: { raw: boolean }];

export type PreviewStyle = string | NormalizedPreviewStyle;

export interface InitCmsOptions {
  cms: typeof CMS;
  config: CmsConfig;
  previewStyles?: NormalizedPreviewStyle[];
}

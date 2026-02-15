declare module 'virtual:astro-cms/user-config' {
  import type { CmsConfig } from 'decap-cms-core';
  import type { CmsType, NormalizedPreviewStyle } from './types';

  const userConfig: {
    cmsType: CmsType;
    config: CmsConfig;
    previewStyles: NormalizedPreviewStyle[];
  };
  export default userConfig;
}

declare global {
  interface Window {
    /**
     * Set to true to manually initialize the CMS
     */
    CMS_MANUAL_INIT?: boolean;
    /**
     * The CMS instance available after loading the CMS script
     */
    CMS?: import('decap-cms-core').CMS;
  }
}

export {};

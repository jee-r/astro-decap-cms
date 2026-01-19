declare module 'virtual:astro-decap-cms/user-config' {
  import type { CmsConfig } from 'decap-cms-core';
  import type { NormalizedPreviewStyle } from './types';

  const userConfig: {
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
     * The Decap CMS instance available after loading decap-cms.js
     */
    CMS?: import('decap-cms-core').CMS;
  }
}

export {};

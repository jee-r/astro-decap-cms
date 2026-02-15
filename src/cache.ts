import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { CmsType } from './types';

/** CDN URLs for each CMS type */
const CDN_URLS: Record<CmsType, (version: string) => string> = {
  decap: (version) => `https://unpkg.com/decap-cms@${version}/dist/decap-cms.js`,
  sveltia: (version) => `https://unpkg.com/@sveltia/cms@${version}/dist/sveltia-cms.js`,
};

/** Default versions for each CMS type */
const DEFAULT_VERSIONS: Record<CmsType, string> = {
  decap: '3.10.0',
  sveltia: 'latest',
};

/** Human-readable CMS names for log messages */
const CMS_NAMES: Record<CmsType, string> = {
  decap: 'Decap CMS',
  sveltia: 'Sveltia CMS',
};

/**
 * Get the cache directory path in the user's project
 * Uses node_modules/.cache/@jee-r/astro-decap-cms/
 */
function getCacheDir(rootDir: string): string {
  return join(rootDir, 'node_modules', '.cache', '@jee-r', 'astro-decap-cms');
}

/**
 * Generate cache filename based on CMS type and version
 */
function getCacheFilename(cmsType: CmsType, version: string): string {
  return `${cmsType}-cms-${version}.js`;
}

/**
 * Fetch CMS script from unpkg
 */
async function fetchFromCdn(cmsType: CmsType, version: string): Promise<string> {
  const url = CDN_URLS[cmsType](version);
  const name = CMS_NAMES[cmsType];

  console.log(`📦 Fetching ${name} ${version} from unpkg...`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${name}@${version} from unpkg: ${response.status} ${response.statusText}`
    );
  }

  const content = await response.text();

  console.log(
    `✓ Downloaded ${name} (${(content.length / 1024 / 1024).toFixed(2)} MB)`
  );

  return content;
}

/**
 * Get or fetch CMS script from cache
 * @param rootDir - The root directory of the user's project (from Vite config)
 * @param version - The version to fetch (e.g., '3.10.0', '^3.0.0', 'latest')
 * @param cmsType - The CMS type ('decap' or 'sveltia')
 */
export async function getCmsJs(
  rootDir: string,
  version: string,
  cmsType: CmsType
): Promise<string> {
  const cacheDir = getCacheDir(rootDir);
  const filename = getCacheFilename(cmsType, version);
  const cachePath = join(cacheDir, filename);
  const name = CMS_NAMES[cmsType];

  // Check if already cached
  if (existsSync(cachePath)) {
    console.log(`✓ Using cached ${name} ${version}`);
    return readFileSync(cachePath, 'utf-8');
  }

  // Fetch from CDN
  const content = await fetchFromCdn(cmsType, version);

  // Save to cache
  mkdirSync(cacheDir, { recursive: true });
  writeFileSync(cachePath, content, 'utf-8');
  console.log(`✓ Cached to ${cachePath}`);

  return content;
}

/**
 * Resolve version for a given CMS type
 * Uses CMS-specific defaults when no version is provided
 */
export function resolveVersion(version?: string, cmsType: CmsType = 'decap'): string {
  if (!version) {
    return DEFAULT_VERSIONS[cmsType];
  }
  return version;
}

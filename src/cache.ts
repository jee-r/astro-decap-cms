import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Get the cache directory path in the user's project
 * Uses node_modules/.cache/@jee-r/astro-decap-cms/
 */
function getCacheDir(rootDir: string): string {
  return join(rootDir, 'node_modules', '.cache', '@jee-r', 'astro-decap-cms');
}

/**
 * Generate cache filename based on version
 */
function getCacheFilename(version: string): string {
  return `decap-cms-${version}.js`;
}

/**
 * Fetch decap-cms.js from unpkg
 */
async function fetchFromUnpkg(version: string): Promise<string> {
  const url = `https://unpkg.com/decap-cms@${version}/dist/decap-cms.js`;

  console.log(`📦 Fetching Decap CMS ${version} from unpkg...`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch decap-cms@${version} from unpkg: ${response.status} ${response.statusText}`
    );
  }

  const content = await response.text();

  console.log(
    `✓ Downloaded decap-cms.js (${(content.length / 1024 / 1024).toFixed(2)} MB)`
  );

  return content;
}

/**
 * Get or fetch decap-cms.js from cache
 * @param rootDir - The root directory of the user's project (from Vite config)
 * @param version - The version to fetch (e.g., '3.10.0', '^3.0.0', 'latest')
 */
export async function getDecapCmsJs(
  rootDir: string,
  version: string
): Promise<string> {
  const cacheDir = getCacheDir(rootDir);
  const filename = getCacheFilename(version);
  const cachePath = join(cacheDir, filename);

  // Check if already cached
  if (existsSync(cachePath)) {
    console.log(`✓ Using cached Decap CMS ${version}`);
    return readFileSync(cachePath, 'utf-8');
  }

  // Fetch from unpkg
  const content = await fetchFromUnpkg(version);

  // Save to cache
  mkdirSync(cacheDir, { recursive: true });
  writeFileSync(cachePath, content, 'utf-8');
  console.log(`✓ Cached to ${cachePath}`);

  return content;
}

/**
 * Resolve version (supports 'latest', semver ranges, exact versions)
 * For now, we just use the provided version as-is and let unpkg resolve it
 */
export function resolveVersion(version?: string): string {
  // If no version specified, use a safe default
  if (!version) {
    return '3.10.0';
  }

  return version;
}

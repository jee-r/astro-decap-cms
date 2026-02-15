<div align="center">
    <img src="./DecAp.svg" alt="DecAP" height="120" />
  <p>
    Add <a href="https://decapcms.org/">Decap CMS</a> or <a href="https://sveltia.com/cms">Sveltia CMS</a>'s admin dashboard
    to any <a href="https://astro.build/">Astro</a> project
  </p>
</div>

## Installation

```bash
npm install @jee-r/astro-decap-cms
# or
pnpm add @jee-r/astro-decap-cms
```

## What is this?

This is an integration for the [Astro](https://astro.build/) site builder,
which adds support for [Decap CMS](https://decapcms.org/) or [Sveltia CMS](https://sveltia.com/cms), open-source, Git-based content management systems.

Adding the integration will:

- Add the CMS admin dashboard at `/admin` (or another route if you prefer)
- Inject Netlify's [Identity Widget](https://github.com/netlify/netlify-identity-widget) across your site to support logging in (Decap CMS only)
- Run a [local proxy server](https://decapcms.org/docs/beta-features/#working-with-a-local-git-repository) in `dev` mode to allow local content updates (Decap CMS only)

Usually each of these requires individual set up and configuration. Using this integration, you configure your CMS once in `astro.config.mjs`, sit back, and enjoy!

> Looking for a quick way to get started? Check out the [demo](./demo) included in this repository.

> **Migrating from Decap CMS to Sveltia CMS?** See the [official migration guide](https://sveltiacms.app/en/docs/migration/netlify-decap-cms).

## Upgrading from v1.x

> **Breaking changes in v2.0:** See the [migration section](#migration-from-v1x) below.

## Usage

### Adding the integration

To add the CMS to your project, import and use the integration in your
Astro config file, adding it to the `integrations` array.

**With Decap CMS (default):**

```js
// astro.config.mjs

import { defineConfig } from 'astro/config';
import CMS from '@jee-r/astro-decap-cms';

export default defineConfig({
  integrations: [
    CMS({
      config: {
        backend: {
          name: 'git-gateway',
          branch: 'main',
        },
        collections: [
          // Content collections
        ],
      },
    }),
  ],
});
```

**With Sveltia CMS:**

```js
// astro.config.mjs

import { defineConfig } from 'astro/config';
import CMS from '@jee-r/astro-decap-cms';

export default defineConfig({
  integrations: [
    CMS({
      cmsType: 'sveltia',
      config: {
        backend: {
          name: 'github',
          repo: 'owner/repo',
          branch: 'main',
        },
        collections: [
          // Content collections
        ],
      },
    }),
  ],
});
```

### Configuration options

You can pass an options object to the integration to configure how it behaves.

#### `cmsType`

**Type:** `'decap' | 'sveltia'`
**Default:** `'decap'`

Which CMS to use. When set to `'sveltia'`:
- [Sveltia CMS](https://sveltia.com/cms) is loaded instead of Decap CMS
- The Netlify Identity Widget is automatically disabled
- The local proxy server (`decap-server`) is not started in dev mode

#### `adminPath`

**Type:** `string`
**Default:** `'/admin'`

Determines the route where the CMS admin dashboard will be available on your site.

Feeling nostalgic for WordPress? You could set this to `'/wp-admin'`!

#### `cmsVersion`

**Type:** `string`
**Default:** `'3.10.0'` (Decap CMS) / `'latest'` (Sveltia CMS)

Specifies which version of the CMS to use. The CMS is automatically fetched from unpkg and cached locally for optimal performance.

Supports:
- Exact versions: `'3.10.0'`
- Semver ranges: `'^3.0.0'`
- Latest: `'latest'`

```js
CMS({
  cmsVersion: '^3.0.0', // Use latest 3.x version
  config: { /* ... */ }
})
```

The CMS file is automatically cached in `node_modules/.cache/` after the first build, enabling offline development and faster subsequent builds.

#### `config`

**Type:** `CmsConfig`

This option is **required**. It allows you to configure the CMS with the
same options you would use when using Decap CMS's `config.yml` file format.

You can see [a full list of configuration options in the Decap CMS docs](https://decapcms.org/docs/configuration-options/). Sveltia CMS uses the same configuration format.

At a minimum, you _must_ set the `backend` and `collections` options:

```js
config: {
  backend: {
    name: 'git-gateway',
    branch: 'main',
  },
  collections: [
    {
      name: 'posts',
      label: 'Blog Posts',
      folder: 'src/pages/posts',
      create: true,
      delete: true,
      fields: [
        { name: 'title', widget: 'string', label: 'Post Title' },
        { name: 'body', widget: 'markdown', label: 'Post Body' },
      ],
    },
  ],
};
```

> **Note:** Sveltia CMS does not support the `git-gateway` backend. See [supported backends](https://sveltiacms.app/en/docs/backends).

#### `previewStyles`

**Type:** `Array<string | [string, { raw: true }]>`

Sets custom CSS styles to apply in the CMS preview pane.

You can provide URLs to external CSS stylesheets (Google Fonts for example), paths to local CSS files in your project, or even raw CSS strings:

```js
previewStyles: [
  // Path to a local CSS file, relative to your project's root directory
  '/src/styles/main.css',
  // An npm module identifier
  '@fontsource/roboto',
  // A URL to an externally hosted CSS file
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap',
  // Raw CSS!
  ['p { color: red; }', { raw: true }],
];
```

#### `disableIdentityWidgetInjection`

**Type:** `boolean`
**Default:** `false` (automatically `true` for Sveltia CMS)

By default, `@jee-r/astro-decap-cms` injects Netlify's [Identity Widget](https://github.com/netlify/netlify-identity-widget) across your site to enable authentication. If you only want to inject the widget on the admin route, you can set `disableIdentityWidgetInjection: true`.

This option is automatically set to `true` when using Sveltia CMS, as it does not use Netlify Identity.

## Migration from v1.x

Version 2.0 introduces support for [Sveltia CMS](https://sveltia.com/cms) and includes the following breaking changes:

- The default export has been renamed from `DecapCMS` to `CMS`
- A new `cmsType` option allows switching between Decap CMS and Sveltia CMS
- Internal virtual module paths have been updated (only relevant if you were importing internals)

```diff
- import DecapCMS from '@jee-r/astro-decap-cms';
+ import CMS from '@jee-r/astro-decap-cms';

  export default defineConfig({
    integrations: [
-     DecapCMS({
+     CMS({
        config: { /* ... */ }
      }),
    ],
  });
```

If you're also switching from Decap CMS to Sveltia CMS, see the [official Sveltia CMS migration guide](https://sveltiacms.app/en/docs/migration/netlify-decap-cms) for CMS-specific changes (backend configuration, unsupported features, etc.).

## Development

### Prerequisites

This project uses [pnpm](https://pnpm.io/) as package manager. Make sure you have it installed:

```bash
npm install -g pnpm
```

### Building the package

To compile the TypeScript source code:

```bash
pnpm run build
```

This compiles all files from `src/` to `dist/`.

### Testing

Run the full test suite (builds the package and the demo for both CMS types):

```bash
pnpm test
```

This will:
1. Build the package (`pnpm run build`)
2. Smoke test with Decap CMS (`pnpm run test:smoke:decap`)
3. Smoke test with Sveltia CMS (`pnpm run test:smoke:sveltia`)

You can also run smoke tests individually:

```bash
pnpm run test:smoke:decap
pnpm run test:smoke:sveltia
```

### Working with the demo

The `demo/` directory contains a working example of the integration.

To run the demo in development mode:

```bash
# With Decap CMS
pnpm run dev:demo:decap

# With Sveltia CMS
pnpm run dev:demo:sveltia
```

This will start the Astro dev server (typically at `http://localhost:4321`). With Decap CMS, a local proxy server is also started for content editing.

## Credits

This project is a maintained fork of [astro-netlify-cms](https://github.com/delucis/astro-netlify-cms) by [@delucis](https://github.com/delucis), updated to support [Decap CMS](https://decapcms.org/) (the community-maintained successor to Netlify CMS).

Some improvements were inspired by the [Advanced Astro fork](https://github.com/advanced-astro/astro-decap-cms), including dependency updates and tooling configurations. These changes were manually integrated rather than cherry-picked to maintain:
- Conventional commit format
- Semantic versioning continuity (their fork reset from 0.6.1 to 0.2.0)
- Consistent package naming and branding
- Clean project history

Thanks to all contributors and maintainers of both projects.

## To-do

- Support registering custom preview components to render content as it is edited.
- Support registering custom block components for use in the Markdown editor.

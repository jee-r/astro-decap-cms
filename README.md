<div align="center">
    <img src="./DecAp.svg" alt="DecAP" height="120" />
  <p>
    Add <a href="https://decapcms.org/">Decap CMS</a>'s admin dashboard
    to any <a href="https://astro.build/">Astro</a> project
  </p>
</div>

## Installation

```bash
npm i @jee-r/astro-decap-cms
```

## What is this?

This is an integration for the [Astro](https://astro.build/) site builder,
which adds support for [Decap CMS](https://decapcms.org/), an
open-source, Git-based content management system.

Adding the integration will:

- Add the Decap CMS dashboard at `/admin` (or another route if you prefer)
- Inject Netlify’s [Identity Widget](https://github.com/netlify/netlify-identity-widget) across your site to support logging in to the admin app
- Run a [local proxy server](https://decapcms.org/docs/beta-features/#working-with-a-local-git-repository) in `dev` mode to allow local content updates via the CMS

Usually each of these requires individual set up and configuration. Using this integration, you configure your CMS once in `astro.config.mjs`, sit back, and enjoy!

> Looking for a quick way to get started? Check out the [demo](./demo) included in this repository.

## Usage

### Adding the integration

To add Decap CMS to your project, import and use the integration in your
Astro config file, adding it to the `integrations` array.

```js
// astro.config.mjs

import { defineConfig } from 'astro/config';
import DecapCMS from '@jee-r/astro-decap-cms';

export default defineConfig({
  integrations: [
    DecapCMS({
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

### Configuration options

You can pass an options object to the integration to configure how it behaves.

#### `adminPath`

**Type:** `string`
**Default:** `'/admin'`

Determines the route where the Decap CMS admin dashboard will be available on your site.

Feeling nostalgic for WordPress? You could set this to `'/wp-admin'`!

#### `config`

**Type:** `CmsConfig`

This option is **required**. It allows you to configure Decap CMS with the
same options you would use when using Decap CMS’s `config.yml` file format.

You can see [a full list of configuration options in the Decap CMS docs](https://decapcms.org/docs/configuration-options/).

At a minimum, you _must_ set the `backend` and `collections` options:

```js
config: {
  // Use Netlify’s “Git Gateway” authentication and target our default branch
  backend: {
    name: 'git-gateway',
    branch: 'main',
  },
  collections: [
    // Define a blog post collection
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

#### `previewStyles`

**Type:** `Array<string | [string, { raw: true }]>`

Sets custom CSS styles to apply in the Decap CMS preview pane.

You can provide URLs to external CSS stylesheets (Google Fonts for example), paths to local CSS files in your project, or even raw CSS strings:

```js
previewStyles: [
  // Path to a local CSS file, relative to your project’s root directory
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
**Default:** `false`

By default, `@jee-r/astro-decap-cms` injects Netlify's [Identity Widget](https://github.com/netlify/netlify-identity-widget) across your site to enable authentication. If you only want to inject the widget on the admin route, you can set `disableIdentityWidgetInjection: true`.

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

Run the full test suite (builds the package and the demo):

```bash
pnpm test
```

This will:
1. Build the package (`pnpm run build`)
2. Install demo dependencies (`cd demo && pnpm install --frozen-lockfile`)
3. Build the demo Astro site (`pnpm run build`)

### Working with the demo

The `demo/` directory contains a working example of the integration.

To run the demo in development mode:

```bash
cd demo
pnpm install
pnpm run dev
```

This will start:
- The Astro dev server (typically at `http://localhost:4321`)
- The Decap CMS proxy server for local content editing

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

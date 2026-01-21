# Astro Blog with Decap CMS

This demo is based on [the Astro blog starter template](https://astro.new/blog?on=github).

It adds:

- [Decap CMS](https://decapcms.org/) dashboard at `/admin`
- Simple markdown preview styling in Decap CMS
- [Local proxy server](https://decapcms.org/docs/working-with-a-local-git-repository/) for local content updates via the CMS
- Netlify Identity for authenticating with the admin app in production

## Quick deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/jee-r/astro-decap-cms)

☝️ Click this button to copy this project to your own GitHub (or GitLab)
account and set up continuous deployment with Netlify as if by magic. ✨

Once you've got the project set up, you do need to
[activate Netlify Identity in the Netlify UI](https://docs.netlify.com/visitor-access/identity/) and then enable
["Git Gateway"](https://docs.netlify.com/visitor-access/git-gateway/) to allow e-mail/password authentication.

## Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                                    |
| :---------------- | :-------------------------------------------------------- |
| `pnpm install`    | Installs dependencies                                     |
| `pnpm dev`        | Starts local dev server & Decap CMS proxy at `:4321`      |
| `pnpm build`      | Build your production site to `./dist/`                   |
| `pnpm preview`    | Preview your build locally before deploying               |

## 🚀 Project Structure

```text
├── public/
├── src/
│   ├── assets/           # Images optimized by Astro
│   ├── components/       # Astro components
│   ├── content/
│   │   └── blog/         # Blog posts (markdown/MDX)
│   ├── layouts/
│   ├── pages/
│   └── styles/
│       ├── global.css           # Site-wide styles
│       └── cms-preview.css      # Preview styles for Decap CMS
├── astro.config.mjs      # Includes DecapCMS integration
├── netlify.toml
└── package.json
```

Key points:

- **`src/content/blog/`** — Your blog posts as Markdown or MDX files. Decap CMS manages these files through the `/admin` interface.
- **`src/styles/cms-preview.css`** — CSS styles applied to the preview pane in Decap CMS for a better editing experience.
- **`astro.config.mjs`** — Configures the Decap CMS integration with collection schema and preview styles.

## 👀 Want to learn more?

- [@jee-r/astro-decap-cms documentation](../README.md)
- [Decap CMS documentation](https://decapcms.org/docs/)
- [Astro documentation](https://docs.astro.build)

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).

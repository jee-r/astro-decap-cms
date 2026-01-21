## [1.1.1](https://github.com/jee-r/astro-decap-cms/compare/v1.1.0...v1.1.1) (2026-01-21)

### Bug Fixes

* **vite:** remove JSON.parse wrapper in virtual module ([2e48f37](https://github.com/jee-r/astro-decap-cms/commit/2e48f370b7e16d87cd9d54a6e67e314694658717))

### Documentation

* **demo:** update README for new template structure ([8873b8d](https://github.com/jee-r/astro-decap-cms/commit/8873b8df611fc9a05fc932ce5e2fad363a8c1062))

### Styles

* **demo:** add CMS preview styles ([bd6ecda](https://github.com/jee-r/astro-decap-cms/commit/bd6ecda7f060eb9d2f12ed0a2a46d3f053862db2))

### Chores

* **demo:** add DecapCMS integration ([edf494c](https://github.com/jee-r/astro-decap-cms/commit/edf494c6239db0dcd0ce07b2eee79c618dcb5b94))
* **demo:** configure Netlify deployment ([8fc8b2a](https://github.com/jee-r/astro-decap-cms/commit/8fc8b2ac8dbfbcdbcf35a7c4a22f7987ebee8ca1))

### Code Refactoring

* **demo:** replace with Astro 5 blog template ([9ccab62](https://github.com/jee-r/astro-decap-cms/commit/9ccab624a5a2d4af646bb11104db36e70f2554be))
## [1.1.0](https://github.com/jee-r/astro-decap-cms/compare/v1.0.0...v1.1.0) (2026-01-19)

### Features

* **cache:** implement unpkg fetch and cache system ([4e667a2](https://github.com/jee-r/astro-decap-cms/commit/4e667a2bf0bb6e49fd3b2c4e3a8e6a02342c2ccd))
* **config:** add cmsVersion option for custom CMS versions ([7d11121](https://github.com/jee-r/astro-decap-cms/commit/7d111217c974b463682eb14f916339c865f4b272))

### Bug Fixes

* **admin:** implement dynamic CMS loading with proper timing ([d9c0ee3](https://github.com/jee-r/astro-decap-cms/commit/d9c0ee3abdf4236921c117f5de87567a1d8fc5cd))
* **server:** use dynamic import instead of spawn for decap-server ([66f1c1d](https://github.com/jee-r/astro-decap-cms/commit/66f1c1d9a7859d2cd0ed4062f07f4269bfe54425))

### Documentation

* add breaking change notice and cross-references ([4c040a6](https://github.com/jee-r/astro-decap-cms/commit/4c040a6907e1b7625a3890112161f83ea3410d83))
* **readme:** add cmsVersion option documentation ([6567400](https://github.com/jee-r/astro-decap-cms/commit/65674005151f1b952fa16760fab3638ce79367fa))

### Chores

* **config:** update ignore files for npm package ([4abd232](https://github.com/jee-r/astro-decap-cms/commit/4abd2325519174d7c15090ee2d67e0df185dde8c))
* **config:** update TypeScript to ES2020 for import.meta support ([b7b5fb2](https://github.com/jee-r/astro-decap-cms/commit/b7b5fb28ca1d8a1d4450b1cb49850a761dd73eb2))
* **deps:** remove unused React and decap-cms-app dependencies ([429f2ce](https://github.com/jee-r/astro-decap-cms/commit/429f2cefffe0e484dc47cf247c0e1e5a492ad5d7))

### Code Refactoring

* **types:** centralize types and add global declarations ([8d408e9](https://github.com/jee-r/astro-decap-cms/commit/8d408e9030f2cae5f84c3508bf65bda65d98123d))
* **vite:** implement unpkg-based CMS loading ([15ba88f](https://github.com/jee-r/astro-decap-cms/commit/15ba88f3707f0429fae37c75f8fe16925efe897e))
## [1.0.0](https://github.com/jee-r/astro-decap-cms/compare/v0.6.1...v1.0.0) (2026-01-18)

### ⚠ BREAKING CHANGES

* **core:** The main export has been renamed from `NetlifyCMS` to `DecapCMS` to reflect the project's migration from Netlify CMS to Decap CMS. Users must update their imports:
  ```diff
  - import NetlifyCMS from '@jee-r/astro-decap-cms';
  + import DecapCMS from '@jee-r/astro-decap-cms';
  ```
  The TypeScript interface has also been renamed from `NetlifyCMSOptions` to `DecapCMSOptions`. See the [README](./README.md#adding-the-integration) for updated usage examples.

### Features

* add editorconfig and VSCode settings ([b72176f](https://github.com/jee-r/astro-decap-cms/commit/b72176f925aa7df5091ac735079e59e8dfa74d14))
* add noindex robots metatag ([529d600](https://github.com/jee-r/astro-decap-cms/commit/529d600f4e52e4b0c4693ab37494d9f20cfc321c))
* add Renovate configuration for automated dependency updates ([e176295](https://github.com/jee-r/astro-decap-cms/commit/e17629539e190e61c0c785c1340e5acca5cbb8ec))

### Bug Fixes

* resolve TypeScript compilation errors for Astro 5 ([43c6724](https://github.com/jee-r/astro-decap-cms/commit/43c6724e85d8a8bd7b615214c964ed0ea3e5636c))
* **vite-plugin:** update import for decap-cms-app 3.10.0 ([e2e3663](https://github.com/jee-r/astro-decap-cms/commit/e2e36636cb95328a6eca67d51d19866ee822f36f))

### Documentation

* add credits section to README ([e4d577b](https://github.com/jee-r/astro-decap-cms/commit/e4d577b5615f897b7b33813d7e7b7eead7b811a2))
* add development section with build and testing instructions ([8c9f278](https://github.com/jee-r/astro-decap-cms/commit/8c9f2787e555b5f84038c4e7684454632e8fc834))
* add MIT license file ([c7295ca](https://github.com/jee-r/astro-decap-cms/commit/c7295ca7beca2ad30b14ffdb2dce6148c0c6d93c))
* **demo:** clean up documentation and references ([f002b8c](https://github.com/jee-r/astro-decap-cms/commit/f002b8c6e62f738521eafbd895206ea405443595))
* fix package name and broken links in README ([0035caa](https://github.com/jee-r/astro-decap-cms/commit/0035caa6a5357fd03b83d09410155439e2f30880))
* update examples to use DecapCMS ([e944508](https://github.com/jee-r/astro-decap-cms/commit/e944508e8b807cb5f9a34358bc95b1258c1a8509))

### Chores

* add changelog configuration for all commit types ([73e5a29](https://github.com/jee-r/astro-decap-cms/commit/73e5a290facf092f0b7885fdf2b56b8357b0b2f8))
* add demo lockfile and update gitignore ([32da775](https://github.com/jee-r/astro-decap-cms/commit/32da775b7e098d79e58cd4cad6ce55e5a5517f6b))
* **build:** add dedicated build script and migrate to pnpm ([b129f62](https://github.com/jee-r/astro-decap-cms/commit/b129f62a6dad8e5e411667b1939908219a8be820))
* **ci:** update GitHub Actions workflows ([c7baf37](https://github.com/jee-r/astro-decap-cms/commit/c7baf37bab095ce8c9732400fe50ecebfffa0fe6))
* **ci:** update release workflow for tag-based releases ([2509bef](https://github.com/jee-r/astro-decap-cms/commit/2509befdba562b8a95d976b68bf7d592e8e0cc59))
* **demo:** add decap-server dependency ([cb3fbb9](https://github.com/jee-r/astro-decap-cms/commit/cb3fbb9d9008b41c362bfbacd8d2938a6145adf4))
* **demo:** migrate start script to pnpm ([b23f9e1](https://github.com/jee-r/astro-decap-cms/commit/b23f9e1e8e393cbc3ba5eec91c47fe497044972f))
* **demo:** update to Astro 5 ([7dc2bc8](https://github.com/jee-r/astro-decap-cms/commit/7dc2bc8cb80854ef1470706f89f1d06384803f5f))
* **deps:** configure pnpm build scripts allowlist ([be5e9f5](https://github.com/jee-r/astro-decap-cms/commit/be5e9f555c5fb7a7ff4ba06466f12e7233d3094f))
* **deps:** update dependencies to latest versions ([a7277c9](https://github.com/jee-r/astro-decap-cms/commit/a7277c97a827ad807b2ac16120aa592dba9a257d))
* **deps:** upgrade to React 19 and latest Decap CMS ([0877dae](https://github.com/jee-r/astro-decap-cms/commit/0877dae83d63e006298336f8e7ed44ac0074e01a))
* fix Changesets configuration ([4d4dd77](https://github.com/jee-r/astro-decap-cms/commit/4d4dd772212b8e2d31195b8d97bb0fb021aa6379))
* ignore demo build artifacts and lockfiles ([cea2987](https://github.com/jee-r/astro-decap-cms/commit/cea298748a3aabfa6b13edaa92ac98251a87e2b7))
* improve package.json keywords ([981390a](https://github.com/jee-r/astro-decap-cms/commit/981390a3bbc32e5f39c0f9ef54d7a7e6f5e393a8))
* migrate from Changesets to conventional-changelog ([bcdb89d](https://github.com/jee-r/astro-decap-cms/commit/bcdb89deb12bd2dde9293f675343a126d44a6d24))

### Code Refactoring

* **core:** rename NetlifyCMS to DecapCMS ([ba3997d](https://github.com/jee-r/astro-decap-cms/commit/ba3997deccdb5d55ade848d928a0944faea795e7))
* **demo:** update to use DecapCMS and main branch ([427ad9f](https://github.com/jee-r/astro-decap-cms/commit/427ad9fb41db7ff9012fe48ef8fcb97df7f849a1))
* improve code quality in src/index.ts ([172f0dd](https://github.com/jee-r/astro-decap-cms/commit/172f0ddcba8da4966330db1ee329f0681980b086))
* move integration folder to src ([31e73ab](https://github.com/jee-r/astro-decap-cms/commit/31e73ab7c42ff5a4c88b22c84a8b564f1f3fd00c))
# astro-netlify-cms

## 0.6.0

### Minor Changes

- Switch from netlify-cms to decap-cms

## 0.5.4

### Patch Changes

- [#76](https://github.com/delucis/astro-netlify-cms/pull/76) [`2e24122`](https://github.com/delucis/astro-netlify-cms/commit/2e241229a38d7aa783ea9df462e66b8c15ffa963) Thanks [@Marocco2](https://github.com/Marocco2)! - Support for Astro v3

## 0.5.3

### Patch Changes

- [#63](https://github.com/delucis/astro-netlify-cms/pull/63) [`e3884e3`](https://github.com/delucis/astro-netlify-cms/commit/e3884e303ba49fd70fb90fc412715de6dec6cfbd) Thanks [@dependabot](https://github.com/apps/dependabot)! - Bump simple-git from 3.15.1 to 3.16.0

## 0.5.2

### Patch Changes

- [`8f23e86`](https://github.com/delucis/astro-netlify-cms/commit/8f23e8667b591838aff456649d7bc059072dd9b0) Thanks [@delucis](https://github.com/delucis)! - Update peer dependencies to support Astro v2

## 0.5.1

### Patch Changes

- [#56](https://github.com/delucis/astro-netlify-cms/pull/56) [`b5cb7aa`](https://github.com/delucis/astro-netlify-cms/commit/b5cb7aac1d243af7a4e9814be1f47158e28a897c) Thanks [@dependabot](https://github.com/apps/dependabot)! - Bump json5 and react-hot-loader

## 0.5.0

### Minor Changes

- [#53](https://github.com/delucis/astro-netlify-cms/pull/53) [`40d0385`](https://github.com/delucis/astro-netlify-cms/commit/40d03858fa4a049684e1b9cc895c7280e7479cb5) Thanks [@delucis](https://github.com/delucis)! - Don’t automatically inject `@astrojs/react` integration

  ⚠️ BREAKING CHANGE ⚠️

  Previously, this integration included [`@astrojs/react`](https://docs.astro.build/en/guides/integrations-guide/react/) and injected it to Astro’s integrations config for you. This is no longer the case.

  If you are using React components and were relying on this, make sure to add the integration when upgrading. The simplest way to do this is to run:

  ```bash
  npx astro add react
  ```

## 0.4.0

### Minor Changes

- [#48](https://github.com/delucis/astro-netlify-cms/pull/48) [`a1a0002`](https://github.com/delucis/astro-netlify-cms/commit/a1a0002c63c542a4dd82ae093effaf18bb824a84) Thanks [@delucis](https://github.com/delucis)! - Add support for importing npm packages via `previewStyles` config

  ⚠️ **BREAKING CHANGE** ⚠️

  This release changes how you import a local CSS file in `previewStyles`.
  These must now be prefixed with a leading `/`:

  ```diff
  {
    previewStyles: [
  -   'src/styles/base.css',
  +   '/src/styles/base.css',
    ],
  }
  ```

  This allows us to support importing CSS you may have installed from an npm module, for example importing font CSS from Fontsource:

  ```js
  previewStyles: ["@fontsource/roboto"];
  ```

## 0.3.5

### Patch Changes

- [#46](https://github.com/delucis/astro-netlify-cms/pull/46) [`cdbf7d6`](https://github.com/delucis/astro-netlify-cms/commit/cdbf7d63df2bbb1b65c661e87f93369f3977725a) Thanks [@delucis](https://github.com/delucis)! - Include identity widget on admin route even when `disableIdentityWidgetInjection` is set to `true`

## 0.3.4

### Patch Changes

- [#41](https://github.com/delucis/astro-netlify-cms/pull/41) [`7e53467`](https://github.com/delucis/astro-netlify-cms/commit/7e53467096dad33bd2c15f060f3c4c4ad03a7a1e) Thanks [@dependabot](https://github.com/apps/dependabot)! - Bump loader-utils from 1.4.0 to 1.4.2

## 0.3.3

### Patch Changes

- [#38](https://github.com/delucis/astro-netlify-cms/pull/38) [`9b2802c`](https://github.com/delucis/astro-netlify-cms/commit/9b2802cb1727d9e1e2f695ad1631c71af9bb9a52) Thanks [@delucis](https://github.com/delucis)! - Restart Netlify CMS proxy server when astro.config reloads

## 0.3.2

### Patch Changes

- [#33](https://github.com/delucis/astro-netlify-cms/pull/33) [`d62b891`](https://github.com/delucis/astro-netlify-cms/commit/d62b8917f78ba7520c32ba0ba6bd32d818183c28) Thanks [@Marocco2](https://github.com/Marocco2)! - Add `disableIdentityWidgetInjection` option

- [#36](https://github.com/delucis/astro-netlify-cms/pull/36) [`c508be4`](https://github.com/delucis/astro-netlify-cms/commit/c508be466b0c46dcd9bc6897045e0b90f173b9ab) Thanks [@delucis](https://github.com/delucis)! - Fix an issue in some browsers with the rich text editor.

  Adds the workaround documented in [netlify/netlify-cms#5092](https://github.com/netlify/netlify-cms/issues/5092) to the admin dashboard.

## 0.3.2-next.0

### Patch Changes

- [#33](https://github.com/delucis/astro-netlify-cms/pull/33) [`d62b891`](https://github.com/delucis/astro-netlify-cms/commit/d62b8917f78ba7520c32ba0ba6bd32d818183c28) Thanks [@Marocco2](https://github.com/Marocco2)! - Add `disableIdentityWidgetInjection` option

## 0.3.1

### Patch Changes

- [`bd64e05`](https://github.com/delucis/astro-netlify-cms/commit/bd64e057e5df57f8e1b494336a98617fb239f5ac) Thanks [@delucis](https://github.com/delucis)! - Upgrade React dependencies

## 0.3.0

### Minor Changes

- [#30](https://github.com/delucis/astro-netlify-cms/pull/30) [`6757440`](https://github.com/delucis/astro-netlify-cms/commit/6757440b968332f0b1dc6a52ee70a6c1852f7b15) Thanks [@delucis](https://github.com/delucis)! - Refactor to use Astro’s built-in `injectRoute` helper to add the admin dashboard.

  Significantly simplifies the Vite plugin logic and should make future improvements easier to implement.

## 0.2.5

### Patch Changes

- [`013a42d`](https://github.com/delucis/astro-netlify-cms/commit/013a42d0e7d656b760283af19422c9602d83a9e3) Thanks [@delucis](https://github.com/delucis)! - Fix preview styles in production builds

## 0.2.4

### Patch Changes

- [#25](https://github.com/delucis/astro-netlify-cms/pull/25) [`eba6556`](https://github.com/delucis/astro-netlify-cms/commit/eba65563e2815242877498bf43f8a1d8b3e4f41a) Thanks [@Opposedmatty](https://github.com/Opposedmatty)! - Fix typo in description meta tag

## 0.2.3

### Patch Changes

- [#23](https://github.com/delucis/astro-netlify-cms/pull/23) [`26243d5`](https://github.com/delucis/astro-netlify-cms/commit/26243d54ebee46122053d315ad929c4636a123e2) Thanks [@codelastnight](https://github.com/codelastnight)! - remove node join() from vite-plugin-admin-dashboard to allow windows to run dev

## 0.2.2

### Patch Changes

- [`a7c4e43`](https://github.com/delucis/astro-netlify-cms/commit/a7c4e43511af695b91c0b2b19a750d769d692f98) Thanks [@delucis](https://github.com/delucis)! - Hot fix: remove comment clashing with over-eager whitespace collapsing by astro-compress

## 0.2.1

### Patch Changes

- [`cb7adcc`](https://github.com/delucis/astro-netlify-cms/commit/cb7adcc8c0a61756817449cf240efacf82cd79c1) Thanks [@delucis](https://github.com/delucis)! - Fix for compression support: end import statements with semi-colons

## 0.2.0

### Minor Changes

- [`0726494`](https://github.com/delucis/astro-netlify-cms/commit/0726494a5908a50ac859a92c7bf78f18f2399437) — Update to Astro v1 🚀

### Patch Changes

- [`f5b06ed`](https://github.com/delucis/astro-netlify-cms/commit/f5b06ed24ec3f90ed17a6dd33def80e531e9ffd3) — Run `netlify-cms-proxy-server` in shell on Windows (fixes [#13](https://github.com/delucis/astro-netlify-cms/issues/13))

## 0.1.0

Initial release

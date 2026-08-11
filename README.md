# HAACcn

HAACcn is a public shadcn source registry containing the complete current core component set, rebuilt on Base UI and styled by [`design.md`](./design.md). It distributes source files through the shadcn CLI; it is not an npm package.

## Install a component

From a project with `components.json`:

```bash
npx shadcn@latest add MotlaqM/HAACcn/button
```

The component brings HAACcn’s Inter font and semantic theme with it. Dependent components resolve to this registry, so installing `sidebar` or `calendar` does not silently mix in stock shadcn files.

## Local development

```bash
npm install
npm run dev
npm run check
npm run registry:smoke
```

`npm run registry:build` generates static registry payloads in `public/r`. The GitHub source-registry flow reads the root `registry.json` directly, so publishing does not require an npm release or registry server.

The smoke test creates a clean temporary Next.js consumer, installs a simple component plus dependent, form, overlay, chart, sidebar, and calendar entries through the public GitHub address, then type-checks the installed source. Set `HAACCN_REGISTRY` to test a fork or alternate GitHub registry address.

## Inventory policy

`scripts/upstream-ui.json` records the official `registry:ui` inventory used for the current release. The `form` entry is metadata-only upstream and intentionally resolves to HAACcn’s `field` component instead of recreating the deprecated form wrapper API.

## License and attribution

HAACcn is MIT licensed. Component implementations are adapted from the MIT-licensed shadcn/ui project and use the MIT-licensed Base UI primitives. See [`NOTICE.md`](./NOTICE.md).

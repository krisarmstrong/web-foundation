# @krisarmstrong/web-foundation

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white) ![License](https://img.shields.io/badge/License-MIT-green) ![Version](https://img.shields.io/badge/Version-0.9.13-blue)

Shared layout primitives (PageShell, Footer, Breadcrumbs, PrimaryNav, UI tokens) for Wi-Fi Vigilante, krisarmstrong-portfolio, and future sites. It now includes the base UI kit (Button, Card, Typography, PageHeader) so every property gets identical navigation, hero headings, and call-to-action styling out of the box. The package is framework-agnostic outside of React + React Router and ships compiled ESM/CJS bundles plus TypeScript definitions out of `dist/`.

## Local development workflow

1. Make edits inside `src/`.
2. (Optional during development) run `npm run dev` here to watch/build into `dist/` with `tsup`.
3. To try unreleased changes in a site, temporarily run `npm install ../web-foundation` there. Never commit a `file:` reference: CI cannot resolve it.

## Releasing

The package is private and is never published to a registry. Each GitHub release carries a verified, attested tarball that the sites install by URL:

1. Bump `version` in `package.json` (stay on 0.x) and merge to `main`.
2. Publish a GitHub release tagged `v<version>` from `main`. The `Attach release tarball` workflow checks that the tag is on `main` and matches the package version, runs lint, tests and `npm audit`, packs the tarball, installs it into a scratch consumer, attests its build provenance and attaches it to the release.
3. In each site, pin the asset URL exactly and reinstall so the lockfile records its integrity:

```bash
npm install https://github.com/krisarmstrong/web-foundation/releases/download/v0.9.13/krisarmstrong-web-foundation-0.9.13.tgz
gh attestation verify krisarmstrong-web-foundation-0.9.13.tgz --repo krisarmstrong/web-foundation
```

## Available components

- `PageShell` – consistent max-width layout, skip link, breadcrumb slot.
- `Footer` – social + legal links. Pass `theme="light"` for lighter sites.
- `Breadcrumbs` – accessible breadcrumb trail that respects light/dark palettes.
- `PrimaryNav` – shared desktop/mobile navigation pills fed by each site’s `PRIMARY_NAV`.
- `Button` – tone-aware CTA with loading state (pass `tone="violet"` for portfolio branding).
- `Card` / `CardContent` – surfaced for dashboards and project grids.
- `Typography` helpers – `H1`, `H2`, `ArticleTitle`, `P`, `MutedText`, `Tag`, `AccentLink`, etc.
- `PageHeader` – icon + subtitle hero block used on the portfolio detail pages.
- `ContactForm` – themable contact capture with honeypot + offline notice logic plus shared privacy copy.
- `tokens` – spacing/color primitives you can override with CSS variables.

### Light vs Dark usage

Every layout primitive now accepts an optional `theme` prop (`'dark' | 'light'`) and references the shared `themeTokens`, so mixing brands is straightforward:

```tsx
<PageShell theme="light">
  <PageHeader
    theme="light"
    icon={Sparkles}
    title="Intrinsic Momentum Mindset"
    description="Guided coaching with sage & gold accents."
  />
  <NavCard theme="light" to="/services" title="Services" description="Grounded, intentional coaching." icon={<Star />} />
</PageShell>
```

You can also wrap apps in the provided `ThemeProvider` to drive colors via CSS variables rather than passing `theme` everywhere.

See each site’s `src/config/navigation.ts` for examples of how to feed nav data into `PrimaryNav`.

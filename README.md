# loupe.heg.wtf

Marketing and paid-download storefront for **Loupe**, private on-device AI photo search for macOS.

## Run locally

```bash
npm run serve
# open http://localhost:4173
```

No install or build step is required. Run validation with:

```bash
npm test
npm run check
```

## Structure

- `index.html`, `styles.css`, `script.js` — responsive English landing page
- `config.js` — public price and Mac App Store product URL
- `assets/loupe-icon.png` — official app icon copied from `../hyper/denvik`
- `privacy/` — app, website, and checkout privacy terms
- `DESIGN_OPTIONS.md` — three MZ concepts and selected direction

## Purchase

Loupe is sold on the Mac App Store at **$14.99 one-time**. Every buy call to action links to the
product page in `config.js` (`appStoreUrl`); there is no self-hosted checkout on this site.

## Deploy

The repository is static and can be published from its root with GitHub Pages, Cloudflare Pages, Netlify, or any static host. Keep `CNAME` so the canonical host is `loupe.heg.wtf`. Configure the DNS record at the domain provider for the selected host before enabling HTTPS.

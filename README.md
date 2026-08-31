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

- `index.html`, `styles.css`, `script.js` — responsive bilingual landing page
- `config.js` — public price and hosted-checkout URL
- `assets/loupe-icon.png` — official app icon copied from `../hyper/denvik`
- `privacy/` — app, website, and checkout privacy terms
- `success/` — post-purchase download recovery guidance
- `DESIGN_OPTIONS.md` — three MZ concepts and selected direction
- `CHECKOUT_SETUP.md` — production payment/download activation checklist

## Payment status

The storefront is implemented for a Lemon Squeezy hosted checkout at **$14.99 one-time**. It intentionally stays in a safe inactive state until the legal account owner adds an approved store's live checkout URL to `config.js` and uploads a signed/notarized app build. See `CHECKOUT_SETUP.md`.

## Deploy

The repository is static and can be published from its root with GitHub Pages, Cloudflare Pages, Netlify, or any static host. Keep `CNAME` so the canonical host is `loupe.heg.wtf`. Configure the DNS record at the domain provider for the selected host before enabling HTTPS.

# Grupo Integral Basilea — Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/41eee693-a813-4935-af95-4c34e9962f97/deploy-status)](https://app.netlify.com/projects/grupobasilea/deploys)

Static marketing website for Grupo Integral Basilea (GIB), a Guatemalan conglomerate operating in agriculture, eco-tourism, and consulting.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Markup | HTML5 (vanilla, no framework) |
| Styles | CSS3 (custom properties, no preprocessor) |
| Logic | JavaScript ES modules (vanilla) |
| Content / i18n | `data/i18n.json` (Spanish + English) |
| Local preview | Vite (`npx vite preview`) |
| Map | Leaflet.js 1.9.4 + OpenStreetMap |
| Deployment | Netlify (production) · GitHub Pages (demo) |

---

## Project Structure

```
/
├── index.html          # Home
├── about.html          # Somos GIB
├── farm.html           # Finca
├── inn.html            # Posada
├── consulting.html     # Consultoría
├── contact.html        # Contáctanos
├── success.html        # Form success redirect
├── _redirects          # Netlify URL rewrite rules
├── assets/
│   ├── images/
│   ├── fonts/
│   ├── icons/
│   └── videos/
├── css/
│   └── styles.css
├── data/
│   └── i18n.json       # All page content (ES + EN)
└── js/
    └── app.js          # Renderer, routing, header/footer injection
```

---

## How It Works

`app.js` fetches `data/i18n.json` on load, reads the `data-page` attribute on `<main>`, and renders the matching page sections. The header and footer are injected into `[data-site-header]` and `[data-site-footer]` slots automatically.

Each page section is defined as a JSON object with a `type` field. The renderer dispatches to a dedicated function per type (`hero`, `contact`, `map`, `imageBanner`, etc.).

**Language** is persisted in `localStorage` (`gib_lang`) so the selected language survives page navigation.

---

## Local Development

No build step required. Run a local static server:

```bash
npx vite preview --port 4173
```

Then open `http://127.0.0.1:4173`.

---

## Branching Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready code |
| `develop` | Integration branch — all features merge here first |
| `feature/*` | Individual feature branches, PRs target `develop` |
| `gh-pages` | GitHub Pages demo — kept in sync with `develop` |

### Updating the GitHub Pages demo

```bash
git checkout gh-pages
git merge develop --no-edit
git push origin gh-pages
git checkout develop
```

> **Note:** the `gh-pages` branch uses relative paths (`about.html` instead of `/about.html`) to work under the `/grupobasilea/` subpath. Do not merge these path changes back into `develop`.

---

## Deployment

### Netlify (production)

Connect the `main` branch. Netlify reads `_redirects` automatically — no additional configuration needed. When the contact form is enabled, add the site to Netlify Forms and remove the `preventDefault` call in `renderContact`.

### GitHub Pages (demo)

Configured to deploy from the `gh-pages` branch, root folder. See **Updating the GitHub Pages demo** above.

---

## Adding a New Page

1. Create `page-name.html` using the base template in `copilot-instructions.md`.
2. Add the route to the `routes` array in `js/app.js`.
3. Add `"page-name"` content under both `es` and `en` in `data/i18n.json`.
4. Add a redirect rule to `_redirects` if a clean URL is needed.

# Portfolio — Muhammad Ghaziveda Belvanaufal

Static site (HTML/CSS/JS, no build step). Design references stanchev.pro.

## Run locally

```bash
python -m http.server 5173
```

Then open http://localhost:5173.

## Edit content

Everything — projects, roles, experience, education, achievements, certificates, skills — is in `js/data.js`.

- **Add a project:** copy one object in `projects`, give it a unique `id`, and list its `roles` (`uiux`, `sa`, `pbd`, `qa`, `webdev`). A project can belong to more than one role.
- **Replace a placeholder photo:** put your image in `assets/img/` and set `cover` (or a section's `image`) to its path, e.g. `"assets/img/flicknfit-cover.png"`. Values that look like `1445205170230-053b83016050` are Unsplash placeholders.
- **Add a live link:** set `link: "https://..."` on a project and the case-study page shows a "Live project" button.
- `device: "phone"` shows the cover in a phone frame; `"browser"` shows a browser window.

## Case-study structure

Each role has a professional case-study structure in `js/templates.js` (UI/UX, System Analyst,
Product & BizDev, QA, Web Dev). Project pages follow it, numbering each part.

- **Fill a part:** add a section to the project in `js/data.js` with the part's `slot`, e.g.
  `{ role: "uiux", slot: "research", body: "..." }` (`role` is only needed on multi-role projects).
  `heading`, `image`, `shot` + `device`, and `code` are optional.
- **See what's missing:** open a project with `&draft`, e.g. `project.html?p=infomedia&draft`.
  Empty parts show as "to fill" boxes with a hint. Visitors never see empty parts.

## Files

- `index.html` + `js/home.js` — home: hero, roles, filterable work grid, experience, about
- `project.html` + `js/project.js` — one case-study template, `project.html?p=<id>`
- `js/templates.js` — case-study structure per role
- `js/site.js` — shared header, contact footer, cards, scroll reveal
- `js/fx.js` — animations, using [Motion](https://motion.dev) (the plain-JS version of Framer Motion, loaded from a CDN). Add `class="reveal" data-fx="<effect>"` to animate an element; effects are listed in the `effects` object. Without Motion, or with reduced motion on, the site falls back to a simple fade.
- `css/style.css` — all styles
- `assets/cv/` — downloadable CVs

# qaisbello.github.io

Personal portfolio of **Qais Adeniji-Bello**, data and AI practitioner: a Data Analytics track with live, interactive dashboards, plus Data Science, Data Engineering and AI tracks.

Plain HTML, CSS and JavaScript. No build step, no server, free to host on GitHub Pages.

## Deploy (one time)
1. Create a **public** repo named exactly `QaisBello.github.io`.
2. Upload everything in this folder to the repo root (Add file → Upload files → drag all files and folders → Commit).
3. Settings → Pages → Deploy from a branch → `main` / `(root)` → Save.
4. After 1–2 minutes the site is live at **https://qaisbello.github.io**.

## How the live data works
Each dashboard fetches its cleaned CSV from its own project repo every time the page opens:

```
https://raw.githubusercontent.com/QaisBello/One-health-life-savers-blood-ledger/main/data/cleaned/fact_responses.csv
```

Update the CSV in the project repo and the dashboard (and the row counts on the home page) update on the next page load. If GitHub can't be reached, the dashboard falls back to the snapshot in `data-analytics/<project>/data/`.

The project repo must be **public**, and the CSV must sit at the path set in the dashboard's `SOURCE` line and in `assets/portfolio.js`.

## Edit your details
Everything you'd normally edit lives in **`assets/portfolio.js`**:
- `PROFILE` holds your headline, About text, experience, skills, certifications and links (add your email here to show it).
- `TRACKS` holds the four sections and their "coming soon" lists.
- `PROJECTS` lists one entry per project. Cards, the home-page index and the gallery all read from it.

## Add a new dashboard
1. Put the dashboard in `data-analytics/<slug>/index.html`. Copy `data-analytics/lifeblood-ledger/index.html` as a starting point and change its `SOURCE` line to the new repo.
2. Optionally put a fallback copy of the CSV in `data-analytics/<slug>/data/`.
3. Add screenshots to `assets/img/`.
4. Add an entry to `PROJECTS` in `assets/portfolio.js` with `status: "live"`.

The home page, the Data Analytics gallery and the live index pick it up automatically.

## Open a "coming soon" track
Add a project to `PROJECTS` with `track: "data-science"` (or `data-engineering` / `ai`). Then swap that track's page for a gallery: copy `data-analytics/index.html` and change `data-track`.

## Structure
```
index.html                       home
about/index.html                 about (from assets/portfolio.js)
data-analytics/index.html        gallery
data-analytics/lifeblood-ledger/ live dashboard (+ data/ fallback snapshot)
dashboards/                      redirects from the old URLs
data-science/ data-engineering/ ai/   coming-soon pages
assets/site.css site.js portfolio.js img/
404.html
```

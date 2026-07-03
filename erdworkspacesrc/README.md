# eRD Workspace — Vite + React

A runnable front-end implementation of the **eRD Workspace** design: an AI-assisted
R&D platform for semiconductor engineers (process / device / yield). Ported from the
Claude Design prototype into a structured React app with shared design tokens,
reusable components, and per-page modules.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # production build → dist/
npm run preview  # preview the build
```

No network is required at runtime — fonts (IBM Plex) and the ant-design icon set are
bundled locally, and charts use ECharts.

## Tech

- **Vite 5** + **React 18** (JavaScript, `React.createElement` — no JSX transform needed)
- **ECharts 5** for all charts (line, gauge, SPC control chart, histogram, pareto)
- **@iconify/react** + **@iconify-json/ant-design** (icon set registered offline, no API calls)
- **@fontsource/ibm-plex-sans** + **ibm-plex-mono** (self-hosted web fonts)

## Project structure

```
src/
  main.jsx                     # entry: fonts, tokens, icon registration, mount
  App.jsx                      # shell: header + sidebar + active page; #cowork-artifact route
  styles/
    tokens.css                 # design tokens from BOTH design systems (--erd-* and --text/--signal/...)
    global.css                 # base styles, hover states, keyframes
  lib/
    css.js                     # css("a:b;c:d") → React style object
    Icon.jsx                   # @iconify/react wrapper
    EChart.jsx                 # ECharts mount + registered "erd" theme
  data/
    catalog.js                 # the 7 categories + every app, favorites constants
  state/
    WorkspaceContext.jsx       # all app state + actions, exposes the derived view-model (V)
  components/
    Header.jsx  Sidebar.jsx  brandIcons.jsx  SPCDashboard.jsx
    charts/     StatTile · LineChart · GaugeChart
    ai/         Welcome · Prompts · Bubble · Sender · ThoughtChain
  pages/
    Home · AI · Cowork · Schedule · Category · Favorites · FullArtifact
```

## Design tokens

`src/styles/tokens.css` holds the two token namespaces the design was built on:

- **`--erd-*`** — eRD AI Chat system (Ant Design v5 seed: daybreak blue, neutral ink,
  radii, chat-bubble tokens).
- **`--text-* / --signal-* / --space-* / --font-*`** — eRD Charting system
  (IBM Plex type scale, Ant data palette, KPI/chart tokens).

Components reference these variables, so re-theming happens in one place.

## Pages

- **Home** — greeting, layout switcher (Focus / Dashboard / Launchpad), inline yield KPI
  tiles, trailing-12-lot line chart + gauge, today's agenda, tasks, quick-launch.
- **eRD AI** — assistant with starter prompts and a chat composer (simulated streaming).
- **Cowork** — Claude-Cowork-style data studio: collapsible chat history, file import
  (drag & drop, 5 files / 5 GB), live processing steps (ThoughtChain) that collapse to a
  summary, and a generated artifact panel (SPC dashboard / slide deck). "Open new tab"
  opens the dashboard full-screen via the `#cowork-artifact` route.
- **Schedule** — recurring AI jobs with cadence, delivery, run-now, active/paused toggle,
  and a create-schedule modal.
- **App Categories / Favorites** — browse all apps across 7 categories; star to pin
  favorites (persisted in `localStorage`).

## Notes

- This is a **front-end prototype**: file upload, `.pptx` download, and the EN/中 toggle
  are illustrative and don't call a backend — wire them up when the APIs exist.
- Components are authored with `React.createElement` and a small `css()` helper so the
  prototype's exact styles port over 1:1. Swap to JSX freely if preferred.

/* Static catalog: the 7 app categories and every app within them. */
export const CATS = [
  { id: 'advisor', name: 'Intelligent EXP Advisor', icon: 'ant-design:bulb-outlined' },
  { id: 'lot', name: 'Lot Management', icon: 'ant-design:database-outlined' },
  { id: 'route', name: 'Route Management', icon: 'ant-design:branches-outlined' },
  { id: 'expana', name: 'EXP Analysis', icon: 'ant-design:experiment-outlined' },
  { id: 'phys', name: 'Physical Analysis', icon: 'ant-design:dot-chart-outlined' },
  { id: 'module', name: 'Module Dev', icon: 'ant-design:appstore-outlined' },
  { id: 'offline', name: 'Offline Wafer Management', icon: 'ant-design:hdd-outlined' },
]

export const APPS = [
  { id: 'exp-recommender', cat: 'advisor', name: 'EXP Recommender', icon: 'ant-design:bulb-outlined', desc: 'Suggest next split from historical DOE outcomes.' },
  { id: 'split-planner', cat: 'advisor', name: 'Split Planner', icon: 'ant-design:apartment-outlined', desc: 'Design multi-leg experiment splits.' },
  { id: 'doe-advisor', cat: 'advisor', name: 'DOE Advisor', icon: 'ant-design:node-index-outlined', desc: 'Factor screening & response surface.' },
  { id: 'risk-scanner', cat: 'advisor', name: 'Risk Scanner', icon: 'ant-design:warning-outlined', desc: 'Flag at-risk lots before the next gate.' },
  { id: 'lot-tracker', cat: 'lot', name: 'Lot Tracker', icon: 'ant-design:database-outlined', desc: 'Live WIP position by process stage.' },
  { id: 'wip-monitor', cat: 'lot', name: 'WIP Monitor', icon: 'ant-design:dashboard-outlined', desc: 'Queue depth & cycle-time health.' },
  { id: 'hold-manager', cat: 'lot', name: 'Hold Manager', icon: 'ant-design:stop-outlined', desc: 'Place, review & release engineering holds.' },
  { id: 'lot-genealogy', cat: 'lot', name: 'Lot Genealogy', icon: 'ant-design:share-alt-outlined', desc: 'Parent / child wafer lineage.' },
  { id: 'route-editor', cat: 'route', name: 'Route Editor', icon: 'ant-design:branches-outlined', desc: 'Author & version process flows.' },
  { id: 'flow-compare', cat: 'route', name: 'Flow Compare', icon: 'ant-design:diff-outlined', desc: 'Diff two routes step by step.' },
  { id: 'recipe-binder', cat: 'route', name: 'Recipe Binder', icon: 'ant-design:link-outlined', desc: 'Bind tool recipes to route steps.' },
  { id: 'step-library', cat: 'route', name: 'Step Library', icon: 'ant-design:build-outlined', desc: 'Reusable unit-process building blocks.' },
  { id: 'yield-explorer', cat: 'expana', name: 'Inline Explorer', icon: 'ant-design:line-chart-outlined', desc: 'Inline by lot, split and bin.' },
  { id: 'spc-console', cat: 'expana', name: 'SPC Console', icon: 'ant-design:fund-outlined', desc: 'Control charts & Western Electric rules.' },
  { id: 'pareto-studio', cat: 'expana', name: 'Pareto Studio', icon: 'ant-design:bar-chart-outlined', desc: 'Rank defect loss signatures.' },
  { id: 'trend-analyzer', cat: 'expana', name: 'Trend Analyzer', icon: 'ant-design:stock-outlined', desc: 'Parametric drift over time.' },
  { id: 'wafermap-viewer', cat: 'phys', name: 'Wafer Map Viewer', icon: 'ant-design:dot-chart-outlined', desc: 'Die-level spatial signatures.' },
  { id: 'defect-classifier', cat: 'phys', name: 'Defect Classifier', icon: 'ant-design:scan-outlined', desc: 'ADC review & defect binning.' },
  { id: 'xsection-log', cat: 'phys', name: 'Cross-section Log', icon: 'ant-design:picture-outlined', desc: 'TEM / SEM image records.' },
  { id: 'fa-tracker', cat: 'phys', name: 'FA Tracker', icon: 'ant-design:file-search-outlined', desc: 'Failure-analysis case queue.' },
  { id: 'device-sandbox', cat: 'module', name: 'Device Sandbox', icon: 'ant-design:experiment-outlined', desc: 'What-if device explorations.' },
  { id: 'tcad-runner', cat: 'module', name: 'TCAD Runner', icon: 'ant-design:cluster-outlined', desc: 'Queue & inspect TCAD jobs.' },
  { id: 'spice-fitter', cat: 'module', name: 'SPICE Fitter', icon: 'ant-design:function-outlined', desc: 'Extract BSIM from I–V sweeps.' },
  { id: 'pdk-browser', cat: 'module', name: 'PDK Browser', icon: 'ant-design:book-outlined', desc: 'Devices, rules & spec limits.' },
  { id: 'wafer-inventory', cat: 'offline', name: 'Wafer Inventory', icon: 'ant-design:hdd-outlined', desc: 'Offline wafer stock by box.' },
  { id: 'carrier-locator', cat: 'offline', name: 'Carrier Locator', icon: 'ant-design:environment-outlined', desc: 'FOUP / cassette whereabouts.' },
  { id: 'retention-log', cat: 'offline', name: 'Retention Log', icon: 'ant-design:clock-circle-outlined', desc: 'Shelf-life & requal timers.' },
  { id: 'scrap-manager', cat: 'offline', name: 'Scrap Manager', icon: 'ant-design:delete-outlined', desc: 'Disposition & scrap approvals.' },
]

export const DEFAULT_FAVS = ['exp-recommender', 'lot-tracker', 'yield-explorer', 'spc-console', 'wafermap-viewer', 'tcad-runner', 'route-editor', 'wip-monitor']
export const FAV_MAX = 20
export const FAV_KEY = 'erd_ws_favs'

export const appById = (id) => APPS.find((a) => a.id === id)
export const catName = (id) => { const c = CATS.find((x) => x.id === id); return c ? c.name : '' }

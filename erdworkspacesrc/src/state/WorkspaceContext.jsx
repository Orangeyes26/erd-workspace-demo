import { createElement as h, createContext, useContext, useState, useRef } from 'react'
import { Icon } from '../lib/Icon'
import { CATS, APPS, DEFAULT_FAVS, FAV_MAX, FAV_KEY, appById, catName } from '../data/catalog'

const WorkspaceContext = createContext(null)
export const useWorkspace = () => useContext(WorkspaceContext)

const initialState = {
  view: 'home', homeLayout: 'a', sidebarOpen: true,
  favorites: null,
  tasks: [
    { id: 't1', text: 'Approve route change RC-4471', done: false },
    { id: 't2', text: 'Review W12 resistance map', done: true },
    { id: 't3', text: 'Sign off lot L23-102 hold release', done: false },
    { id: 't4', text: 'Update SPICE model card v3', done: false },
    { id: 't5', text: 'Prep N5 inline gate slides', done: false },
  ],
  aiMessages: [], aiInput: '', aiStreaming: false,
  activeCat: 'advisor', search: '',
  notifOpen: false, userMenuOpen: false, lang: 'en',
  cwFiles: [
    { id: 'f1', name: 'Vt_gateCD_lots.xlsx', sizeBytes: 2411724, meta: '2.4 MB · 24 lots', icon: 'ant-design:file-excel-outlined', color: '#52c41a' },
    { id: 'f2', name: 'defect_pareto.csv', sizeBytes: 842301, meta: '842 KB · 104 rows', icon: 'ant-design:file-text-outlined', color: '#1677ff' },
  ],
  cwSource: 'Inline DB · N5 line',
  cwThread: [
    { id: 'u0', role: 'user', text: 'Generate an SPC analysis of Vt (gate CD) from the imported lots.' },
    { id: 'a0', role: 'ai', text: 'Done — pulled 24 lots from the Vt sheet, computed control limits (CL 0.421 V, ±3σ) and ran Western Electric rules. One point (lot 109) breaches +3σ. The dashboard is on the right.', artifact: 'SPC analysis — Vt (gate CD)', steps: [{ key: '1', title: 'Reading imported files', description: 'Vt_gateCD_lots.xlsx · defect_pareto.csv' }, { key: '2', title: 'Parsing 24 lots · computing μ, σ, Cpk' }, { key: '3', title: 'Building control chart · Western Electric rules' }, { key: '4', title: 'Rendering dashboard' }], stepsOpen: false },
  ],
  cwInput: '', cwGenerating: false, cwArtifactTab: 'dashboard', cwSteps: [],
  cwPlusOpen: false, cwPlusView: 'root',
  cwUploadOpen: false, cwUploadWarn: '', cwFilesPopover: false, cwDragActive: false,
  cwHistoryOpen: true, cwActiveSession: 'c1',
  cwSessions: [
    { id: 'c1', title: 'SPC — Vt (gate CD)', time: 'Just now' },
    { id: 'c2', title: 'Inline trend — N5 24 lots', time: '2h ago' },
    { id: 'c3', title: 'Defect pareto — W12', time: 'Yesterday' },
    { id: 'c4', title: 'Idsat vs Vt cloud', time: 'Mon' },
    { id: 'c5', title: 'Overlay budget summary', time: 'Jun 28' },
  ],
  schedJobs: [
    { id: 's1', name: 'Morning yield digest', icon: 'ant-design:fund-outlined', instruction: 'Summarize overnight inline data and flag any lot below the 92% target.', cadence: 'Every weekday · 07:30', target: 'Inline DB · N5 line', delivery: 'Home feed + Email', active: true, last: { text: '3 lots flagged', tone: 'warn', time: 'today 07:30' }, next: 'Tomorrow 07:30' },
    { id: 's2', name: 'SPC breach watch', icon: 'ant-design:alert-outlined', instruction: 'Check the SPC Console for Western Electric rule violations on Vt and Idsat; alert on any breach.', cadence: 'Every 2 hours', target: 'SPC Console', delivery: 'Cowork + Email', active: true, last: { text: 'No breaches', tone: 'pass', time: '1h ago' }, next: 'In 58 min' },
    { id: 's3', name: 'Weekly gate pack', icon: 'ant-design:file-ppt-outlined', instruction: 'Generate the N5 yield gate deck (.pptx) from the latest lots and post it to Cowork.', cadence: 'Every Monday · 08:00', target: 'Inline Explorer', delivery: 'Cowork', active: true, last: { text: 'Deck ready · 6 slides', tone: 'pass', time: 'Mon 08:00' }, next: 'Mon 08:00' },
    { id: 's4', name: 'Hold aging report', icon: 'ant-design:clock-circle-outlined', instruction: 'List engineering holds older than 48h with owners and reasons.', cadence: 'Daily · 18:00', target: 'Hold Manager', delivery: 'Email', active: false, last: { text: 'Paused', tone: 'neutral', time: '—' }, next: 'Paused' },
    { id: 's5', name: 'TCAD queue summary', icon: 'ant-design:cluster-outlined', instruction: 'Summarize TCAD job completions and failures; highlight non-converged runs.', cadence: 'Every 6 hours', target: 'TCAD Runner', delivery: 'Home feed', active: true, last: { text: '12 done · 1 failed', tone: 'warn', time: '3h ago' }, next: 'In 2h 40m' },
  ],
  schedFormOpen: false,
  schedForm: { name: '', instruction: '', source: 'Inline DB · N5 line', cadence: 'Every weekday · 07:30', delivery: 'Home feed' },
}

export function WorkspaceProvider({ children }) {
  const [state, setStateRaw] = useState(() => {
    let favs = DEFAULT_FAVS.slice()
    try { const raw = localStorage.getItem(FAV_KEY); if (raw) favs = JSON.parse(raw) } catch (e) { /* ignore */ }
    return { ...initialState, favorites: favs }
  })
  const setState = (patch) => setStateRaw((prev) => Object.assign({}, prev, typeof patch === 'function' ? patch(prev) : patch))
  const stateRef = useRef(state)
  stateRef.current = state
  const T = useRef({})

  // ---- favorites ----
  const favs = () => state.favorites || DEFAULT_FAVS
  const saveFavs = (list) => { try { localStorage.setItem(FAV_KEY, JSON.stringify(list)) } catch (e) { /* ignore */ } setState({ favorites: list }) }
  const isFav = (id) => favs().indexOf(id) >= 0
  const toggleFav = (id) => {
    const l = favs().slice(); const i = l.indexOf(id)
    if (i >= 0) l.splice(i, 1); else { if (l.length >= FAV_MAX) return; l.push(id) }
    saveFavs(l)
  }

  // ---- navigation ----
  const go = (view, extra) => setState(Object.assign({ view, notifOpen: false, userMenuOpen: false }, extra || {}))
  const openApp = (id) => { const a = appById(id); if (a) go('category', { activeCat: a.cat, search: '' }) }
  const openCat = (id) => go('category', { activeCat: id, search: '' })

  // ---- helpers ----
  const ic = (name, style) => Icon(name, style)
  const avatar = (initials, bg) => h('div', { style: { width: 28, height: 28, borderRadius: '50%', background: bg || 'var(--erd-blue-7)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 } }, initials)
  const wsAvatars = (list) => {
    const colors = { KL: '#1677ff', JT: '#13c2c2', RP: '#d48806', MW: '#722ed1', SC: '#52c41a', DZ: '#08979c', AH: '#cf1322' }
    return list.map((iName, idx) => h('div', { key: idx, style: { width: 24, height: 24, borderRadius: '50%', background: colors[iName] || '#8c8c8c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 600, border: '2px solid #fff', marginLeft: idx ? -8 : 0 } }, iName))
  }

  // ---- eRD AI ----
  const sendAI = (text) => {
    if (!text || !text.trim()) return
    const msgs = state.aiMessages.concat([{ role: 'user', content: text.trim() }])
    setState({ aiMessages: msgs, aiInput: '', aiStreaming: true })
    clearTimeout(T.current._t)
    T.current._t = setTimeout(() => {
      const reply = 'Below ~1.2 nm physical SiO₂, gate leakage climbs roughly an order of magnitude per 0.2 nm thinned, driven by direct tunneling. For this split I would hold EOT ≥ 0.9 nm and compare Ioff at matched Idsat. I can pull the trailing 12 lots from Inline Explorer and overlay the DIBL trend if that helps.'
      setState((s) => ({ aiMessages: s.aiMessages.concat([{ role: 'ai', content: reply }]), aiStreaming: false }))
    }, 1300)
  }

  // ---- Cowork ----
  const cwBuildSteps = (slides) => (slides ? [
    { key: '1', title: 'Reading the SPC analysis' },
    { key: '2', title: 'Structuring 4 slides' },
    { key: '3', title: 'Generating charts & captions' },
    { key: '4', title: 'Assembling .pptx' },
  ] : [
    { key: '1', title: 'Reading imported files', description: 'Vt_gateCD_lots.xlsx · defect_pareto.csv' },
    { key: '2', title: 'Parsing 24 lots · computing μ, σ, Cpk' },
    { key: '3', title: 'Building control chart · Western Electric rules' },
    { key: '4', title: 'Rendering dashboard' },
  ])
  const scrollThread = () => { setTimeout(() => { const el = document.getElementById('cwThreadScroll'); if (el) el.scrollTop = el.scrollHeight }, 40) }
  const cwGenerate = (text) => {
    if (!text || !text.trim()) return
    const t = text.trim()
    const slides = /slide|ppt|deck|presentation/i.test(t)
    const steps = cwBuildSteps(slides)
    const live = steps.map((s, i) => Object.assign({}, s, { status: i === 0 ? 'running' : 'pending' }))
    setState((s) => ({ cwThread: s.cwThread.concat([{ id: 'u' + Date.now(), role: 'user', text: t }]), cwInput: '', cwGenerating: true, cwSteps: live }))
    scrollThread();
    (T.current._cw || []).forEach(clearTimeout); T.current._cw = []
    const STEP = 620
    for (let i = 0; i < steps.length; i++) {
      T.current._cw.push(setTimeout(() => {
        setState((s) => ({ cwSteps: s.cwSteps.map((x, j) => Object.assign({}, x, { status: j <= i ? 'success' : (j === i + 1 ? 'running' : 'pending') })) }))
        scrollThread()
      }, STEP * (i + 1)))
    }
    T.current._cw.push(setTimeout(() => {
      const reply = slides
        ? 'Built a 4-slide deck from the SPC analysis — title, control chart, distribution & Cpk, and findings. Preview it under the Slides tab; download as .pptx when ready.'
        : 'Regenerated: control limits recomputed (CL 0.421 V, ±3σ), Western Electric rules applied, and the defect pareto refreshed from the CSV. One out-of-control point remains on lot 109.'
      const doneSteps = steps.map((x) => Object.assign({}, x, { status: 'success' }))
      setState((s) => ({ cwThread: s.cwThread.concat([{ id: 'a' + Date.now(), role: 'ai', text: reply, artifact: slides ? 'SPC deck · 4 slides' : 'SPC analysis — Vt (gate CD)', steps: doneSteps, stepsOpen: false }]), cwGenerating: false, cwSteps: [], cwArtifactTab: slides ? 'slides' : 'dashboard' }))
      scrollThread()
    }, STEP * steps.length + 420))
  }
  const cwToggleSteps = (id) => setState((s) => ({ cwThread: s.cwThread.map((m) => (m.id === id ? Object.assign({}, m, { stepsOpen: !m.stepsOpen }) : m)) }))

  const fmtSize = (b) => {
    if (b >= 1e9) return (b / 1e9).toFixed(1) + ' GB'
    if (b >= 1e6) return (b / 1e6).toFixed(1) + ' MB'
    if (b >= 1e3) return Math.round(b / 1e3) + ' KB'
    return (b || 0) + ' B'
  }
  const iconForName = (n) => {
    const e = (n.split('.').pop() || '').toLowerCase()
    if (e === 'xlsx' || e === 'xls') return 'ant-design:file-excel-outlined'
    if (e === 'csv' || e === 'txt' || e === 'tsv') return 'ant-design:file-text-outlined'
    if (e === 'pdf') return 'ant-design:file-pdf-outlined'
    if (['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg'].indexOf(e) >= 0) return 'ant-design:file-image-outlined'
    return 'ant-design:file-outlined'
  }
  const colorForName = (n) => {
    const e = (n.split('.').pop() || '').toLowerCase()
    if (e === 'xlsx' || e === 'xls') return '#52c41a'
    if (e === 'csv' || e === 'txt' || e === 'tsv') return '#1677ff'
    if (e === 'pdf') return '#ff4d4f'
    if (['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg'].indexOf(e) >= 0) return '#722ed1'
    return '#8c8c8c'
  }
  const cwAddFileObjects = (list) => {
    const files = Array.from(list || [])
    if (!files.length) return
    const MAX = 5, MAXB = 5 * 1024 * 1024 * 1024
    const cur = stateRef.current.cwFiles.slice()
    let warn = ''
    for (const f of files) {
      if (cur.length >= MAX) { warn = 'You can attach up to 5 files per chat.'; break }
      const total = cur.reduce((a, x) => a + (x.sizeBytes || 0), 0)
      if (total + f.size > MAXB) { warn = 'Total attachments would exceed 5 GB.'; break }
      cur.push({ id: 'f' + Date.now() + '_' + Math.random().toString(36).slice(2, 6), name: f.name, sizeBytes: f.size, meta: fmtSize(f.size), icon: iconForName(f.name), color: colorForName(f.name) })
    }
    setState({ cwFiles: cur, cwUploadWarn: warn })
  }

  // ---- Schedule ----
  const schedRunNow = (id) => {
    setState((s) => ({ schedJobs: s.schedJobs.map((j) => (j.id === id ? Object.assign({}, j, { last: { text: 'Running…', tone: 'info', time: 'now' } }) : j)) }))
    clearTimeout(T.current['_sr' + id])
    T.current['_sr' + id] = setTimeout(() => {
      setState((s) => ({ schedJobs: s.schedJobs.map((j) => (j.id === id ? Object.assign({}, j, { last: { text: 'Completed just now', tone: 'pass', time: 'just now' } }) : j)) }))
    }, 1400)
  }
  const schedCreate = () => {
    const f = stateRef.current.schedForm
    if (!f.name.trim() || !f.instruction.trim()) return
    const job = { id: 's' + Date.now(), name: f.name.trim(), icon: 'ant-design:robot-outlined', instruction: f.instruction.trim(), cadence: f.cadence, target: f.source, delivery: f.delivery, active: true, last: { text: 'Not run yet', tone: 'neutral', time: '—' }, next: 'Scheduled' }
    setState((s) => ({ schedJobs: s.schedJobs.concat([job]), schedFormOpen: false, schedForm: { name: '', instruction: '', source: 'Inline DB · N5 line', cadence: 'Every weekday · 07:30', delivery: 'Home feed' } }))
  }

  const V = buildViewModel({ state, stateRef, setState, favs, isFav, toggleFav, go, openApp, openCat, ic, avatar, sendAI, cwGenerate, cwToggleSteps, scrollThread, cwAddFileObjects, fmtSize, schedRunNow, schedCreate })
  return h(WorkspaceContext.Provider, { value: V }, children)
}

/* ---- derived view-model (was renderVals() in the prototype) ---- */
function buildViewModel(ctx) {
  const { state: st, stateRef, setState, favs, isFav, toggleFav, go, openApp, openCat, ic, avatar, sendAI, cwGenerate, cwToggleSteps, scrollThread, cwAddFileObjects, fmtSize, schedRunNow, schedCreate } = ctx
  const fullArtifact = (typeof window !== 'undefined' && window.location && window.location.hash === '#cowork-artifact')
  const collapsed = !st.sidebarOpen
  const navBase = { display: 'flex', alignItems: 'center', gap: '12px', height: '40px', padding: collapsed ? '0' : '0 12px', justifyContent: collapsed ? 'center' : 'flex-start', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', transition: 'background .12s' }
  const navStyle = (v) => { const on = st.view === v; return Object.assign({}, navBase, { color: on ? 'var(--erd-color-primary)' : 'var(--erd-color-text-secondary)', background: on ? 'var(--erd-color-primary-bg)' : 'transparent', fontWeight: on ? 600 : 500 }) }
  const labelStyle = collapsed ? { display: 'none' } : {}
  const navLabelFlex = collapsed ? { display: 'none' } : { flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
  const navCountStyle = collapsed ? { display: 'none' } : { fontSize: '11px', color: 'var(--erd-color-text-tertiary)' }
  const favRemoveStyle = collapsed ? { display: 'none' } : { width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px', color: 'var(--erd-color-text-quaternary)', fontSize: '12px' }
  const favRowStyle = { display: 'flex', alignItems: 'center', gap: '12px', height: '36px', padding: collapsed ? '0' : '0 12px', justifyContent: collapsed ? 'center' : 'flex-start', borderRadius: '8px', cursor: 'pointer', color: 'var(--erd-color-text-secondary)', fontSize: '13px' }
  const sectionStyle = collapsed ? { display: 'none' } : { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 12px 6px', fontSize: '11px', fontWeight: 600, letterSpacing: '.4px', textTransform: 'uppercase', color: 'var(--erd-color-text-tertiary)' }

  const favList = favs().map((id) => {
    const a = appById(id) || { name: id, icon: 'ant-design:appstore-outlined', cat: '' }
    return { id, name: a.name, icon: a.icon, catName: catName(a.cat), onOpen: () => openApp(id), onRemove: (e) => { if (e && e.stopPropagation) e.stopPropagation(); toggleFav(id) } }
  })
  const catList = CATS.map((c) => {
    const on = st.view === 'category' && st.activeCat === c.id
    return Object.assign({}, c, {
      count: APPS.filter((a) => a.cat === c.id).length,
      onOpen: () => openCat(c.id),
      rowStyle: Object.assign({}, navBase, { color: on ? 'var(--erd-color-primary)' : 'var(--erd-color-text-secondary)', background: on ? 'var(--erd-color-primary-bg)' : 'transparent', height: '38px', fontWeight: on ? 600 : 500, fontSize: '13px' }),
    })
  })
  const layouts = {
    a: { display: 'grid', gap: '16px', alignItems: 'start', gridTemplateColumns: '340px minmax(0,1fr)', gridTemplateAreas: '"sched kpi" "sched yield" "fav fav"' },
    b: { display: 'grid', gap: '16px', alignItems: 'start', gridTemplateColumns: 'minmax(0,1fr) 360px', gridTemplateAreas: '"kpi kpi" "yield sched" "fav sched"' },
    c: { display: 'grid', gap: '16px', alignItems: 'start', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gridTemplateAreas: '"fav fav" "kpi kpi" "sched yield"' },
  }
  const segItem = (on) => ({ padding: '0 13px', height: '30px', display: 'flex', alignItems: 'center', fontSize: '12.5px', cursor: 'pointer', fontWeight: on ? 600 : 500, color: on ? '#fff' : 'var(--erd-color-text-secondary)', background: on ? 'var(--erd-color-primary)' : '#fff' })
  const taskList = st.tasks.map((t) => ({
    text: t.text,
    onToggle: () => setState((s) => ({ tasks: s.tasks.map((x) => (x.id === t.id ? Object.assign({}, x, { done: !x.done }) : x)) })),
    boxStyle: { width: '18px', height: '18px', borderRadius: '5px', border: t.done ? 'none' : '1.5px solid var(--erd-color-border)', background: t.done ? 'var(--erd-color-primary)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' },
    checkStyle: { color: '#fff', fontSize: '11px', display: t.done ? 'block' : 'none' },
    textStyle: { fontSize: '13px', color: t.done ? 'var(--erd-color-text-tertiary)' : 'var(--erd-color-text)', textDecoration: t.done ? 'line-through' : 'none' },
  }))

  // Category view
  const chipCats = [{ id: 'all', name: 'All apps', icon: 'ant-design:appstore-outlined' }].concat(CATS)
  const activeCat = st.activeCat
  const q = (st.search || '').toLowerCase().trim()
  let apps = activeCat === 'all' ? APPS.slice() : APPS.filter((a) => a.cat === activeCat)
  if (q) apps = APPS.filter((a) => (a.name.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q) || catName(a.cat).toLowerCase().includes(q)))
  const catApps = apps.map((a) => {
    const fav = isFav(a.id)
    return { name: a.name, desc: a.desc, icon: a.icon, catName: catName(a.cat), onOpen: () => openApp(a.id), onToggle: (e) => { if (e && e.stopPropagation) e.stopPropagation(); toggleFav(a.id) }, starIcon: fav ? 'ant-design:star-filled' : 'ant-design:star-outlined', starColor: 'color:' + (fav ? 'var(--erd-color-warning)' : 'var(--erd-color-text-quaternary)') }
  })
  const catChips = chipCats.map((c) => {
    const on = q ? c.id === 'all' : c.id === activeCat
    return { name: c.name, icon: c.icon, onSelect: () => setState({ activeCat: c.id, search: '', view: 'category' }), chipStyle: { display: 'inline-flex', alignItems: 'center', gap: '6px', height: '32px', padding: '0 13px', borderRadius: '17px', cursor: 'pointer', fontSize: '13px', fontWeight: on ? 600 : 500, border: '1px solid ' + (on ? 'var(--erd-color-primary)' : 'var(--erd-color-border)'), background: on ? 'var(--erd-color-primary-bg)' : '#fff', color: on ? 'var(--erd-color-primary)' : 'var(--erd-color-text-secondary)' } }
  })
  const catObj = CATS.find((c) => c.id === activeCat)
  const catTitle = q ? 'Search results' : (activeCat === 'all' ? 'All apps' : (catObj ? catObj.name : 'Apps'))
  const catSubtitle = q ? ('Matching "' + st.search + '" across all categories.') : (activeCat === 'all' ? 'Every app across the 7 categories. Star any app to pin it to My Favorites.' : (catObj ? ('Apps in ' + catObj.name + '. Star to pin to My Favorites.') : ''))

  // AI
  const robotAvatar = h('div', { style: { width: 32, height: 32, borderRadius: '50%', background: 'var(--erd-color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 } }, ic('ant-design:robot-outlined'))
  const userAvatar = avatar('KL')
  const aiMsgs = st.aiMessages.map((m) => ({ placement: m.role === 'user' ? 'end' : 'start', header: m.role === 'user' ? 'You' : 'eRD Assistant', content: m.content, avatar: m.role === 'user' ? userAvatar : robotAvatar }))
  const aiPrompts = [
    { key: 'a', icon: ic('ant-design:experiment-outlined'), label: 'Explain DIBL at short channel', description: 'Drain-induced barrier lowering & mitigation' },
    { key: 'b', icon: ic('ant-design:file-search-outlined'), label: 'Summarize a TCAD log', description: 'Extract convergence + key device params' },
    { key: 'c', icon: ic('ant-design:dot-chart-outlined'), label: 'Inline pareto from a wafer map', description: 'Rank defect signatures by loss' },
    { key: 'd', icon: ic('ant-design:function-outlined'), label: 'Fit a SPICE model', description: 'Extract BSIM params from I–V sweeps' },
  ]

  // Cowork view-model
  const toneColor = { pass: 'var(--erd-color-success)', warn: 'var(--erd-color-warning)', fail: 'var(--erd-color-error)', info: 'var(--erd-color-primary)', neutral: 'var(--erd-color-text-quaternary)' }
  const cwFilesV = st.cwFiles.map((f) => ({ name: f.name, meta: f.meta, icon: f.icon, color: f.color, onRemove: (e) => { if (e && e.stopPropagation) e.stopPropagation(); setState((s) => ({ cwFiles: s.cwFiles.filter((x) => x.id !== f.id) })) } }))
  const cwThreadV = st.cwThread.map((m) => ({
    id: m.id, isUser: m.role === 'user', isAI: m.role !== 'user', text: m.text, artifact: m.artifact || '', hasArtifact: !!m.artifact,
    hasSteps: !!(m.steps && m.steps.length), stepsOpen: !!m.stepsOpen,
    stepsChevron: m.stepsOpen ? 'ant-design:up-outlined' : 'ant-design:down-outlined',
    stepsSummary: 'Worked through ' + (m.steps ? m.steps.length : 0) + ' steps',
    stepItems: (m.steps || []).map((s) => ({ key: s.key, title: s.title, description: s.description, status: 'success' })),
    onToggleSteps: () => cwToggleSteps(m.id),
    rowStyle: { display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' },
    bubbleStyle: m.role === 'user'
      ? { maxWidth: '86%', background: 'var(--erd-color-primary)', color: '#fff', padding: '10px 13px', borderRadius: '14px 14px 4px 14px', fontSize: '13px', lineHeight: 1.5 }
      : { maxWidth: '92%', background: 'var(--erd-color-fill-tertiary)', color: 'var(--erd-color-text)', padding: '11px 13px', borderRadius: '14px 14px 14px 4px', fontSize: '13px', lineHeight: 1.55 },
  }))
  const cwSessionsV = st.cwSessions.map((c) => ({ id: c.id, title: c.title, time: c.time, active: c.id === st.cwActiveSession, onSelect: () => setState({ cwActiveSession: c.id }), rowStyle: { display: 'flex', flexDirection: 'column', gap: '2px', padding: '9px 11px', borderRadius: '8px', cursor: 'pointer', background: c.id === st.cwActiveSession ? 'var(--erd-color-primary-bg)' : 'transparent' } }))
  const artTab = (on) => ({ padding: '0 13px', height: '30px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', borderRadius: '7px', fontWeight: on ? 600 : 500, color: on ? 'var(--erd-color-primary)' : 'var(--erd-color-text-secondary)', background: on ? 'var(--erd-color-primary-bg)' : 'transparent' })
  const cwSlides = [
    { n: '01', title: 'SPC Analysis — Vt (gate CD)', sub: 'Inline DB · N5 line · Jul 2' },
    { n: '02', title: 'Control chart & limits', sub: 'CL 0.421 V · ±3σ · WE rules' },
    { n: '03', title: 'Distribution & Cpk', sub: 'Cpk 1.34 · μ 0.421 · σ 0.011' },
    { n: '04', title: 'Findings & recommendation', sub: '1 OOC point · lot 109' },
  ]

  // Schedule view-model
  const schedList = st.schedJobs.map((j) => ({
    id: j.id, name: j.name, icon: j.icon, instruction: j.instruction, cadence: j.cadence, target: j.target, delivery: j.delivery, active: j.active,
    lastText: j.last.text, lastTime: j.last.time, lastDot: toneColor[j.last.tone] || toneColor.neutral, next: j.next,
    cardStyle: { background: '#fff', border: '1px solid var(--erd-color-border-secondary)', borderRadius: '11px', padding: '16px 18px', opacity: j.active ? 1 : 0.7, transition: 'opacity .15s' },
    switchStyle: { width: '38px', height: '22px', borderRadius: '11px', background: j.active ? 'var(--erd-color-primary)' : 'var(--erd-color-fill)', position: 'relative', cursor: 'pointer', transition: 'background .15s', flex: 'none' },
    knobStyle: { position: 'absolute', top: '2px', left: j.active ? '18px' : '2px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', transition: 'left .15s', boxShadow: '0 1px 2px rgba(0,0,0,.2)' },
    onToggle: () => setState((s) => ({ schedJobs: s.schedJobs.map((x) => (x.id === j.id ? Object.assign({}, x, { active: !x.active, next: x.active ? 'Paused' : 'Rescheduled' }) : x)) })),
    onRun: () => schedRunNow(j.id),
  }))
  const schedActiveCount = st.schedJobs.filter((j) => j.active).length

  const hr = new Date().getHours()
  const greeting = hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening'
  const openTaskCount = st.tasks.filter((t) => !t.done).length
  const langBtn = (on) => ({ padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: '12.5px', cursor: 'pointer', fontWeight: 500, color: on ? '#fff' : 'var(--erd-color-text-secondary)', background: on ? 'var(--erd-color-primary)' : '#fff' })
  const notifications = [
    { icon: 'ant-design:check-circle-outlined', color: 'var(--erd-color-success)', text: 'Inline gate for N5 module passed at 93.4%.', time: '12 min ago' },
    { icon: 'ant-design:warning-outlined', color: 'var(--erd-color-warning)', text: 'Cpk on Vt drifted below 1.33 on lot L23-118.', time: '1 hour ago' },
    { icon: 'ant-design:comment-outlined', color: 'var(--erd-color-primary)', text: 'Mei Wong mentioned you in Gate-oxide DOE.', time: '2 hours ago' },
  ]

  return {
    // header
    search: st.search,
    onSearch: (e) => { const v = e.target.value; setState({ search: v, view: v ? 'category' : (st.view === 'category' && !st.search ? 'category' : st.view) }) },
    toggleSidebar: () => setState((s) => ({ sidebarOpen: !s.sidebarOpen })),
    goHome: () => go('home'), goAI: () => go('ai'), goCowork: () => { go('cowork'); scrollThread() },
    goSchedule: () => go('schedule'), goBrowse: () => go('category', { activeCat: 'all', search: '' }),
    openYieldExplorer: () => openApp('yield-explorer'),
    toggleNotif: () => setState((s) => ({ notifOpen: !s.notifOpen, userMenuOpen: false })),
    toggleUserMenu: () => setState((s) => ({ userMenuOpen: !s.userMenuOpen, notifOpen: false })),
    closeMenus: () => setState({ notifOpen: false, userMenuOpen: false }),
    notifOpen: st.notifOpen, userMenuOpen: st.userMenuOpen, notifications,
    setLangEn: () => setState({ lang: 'en' }), setLangZh: () => setState({ lang: 'zh' }),
    langEnStyle: langBtn(st.lang === 'en'), langZhStyle: langBtn(st.lang === 'zh'),

    // sidebar
    sidebarStyle: { width: st.sidebarOpen ? '264px' : '72px', flex: 'none', background: '#fff', borderRight: '1px solid var(--erd-color-border-secondary)', display: 'flex', flexDirection: 'column', transition: 'width .18s ease', overflow: 'hidden' },
    labelStyle, sectionStyle, navLabelFlex, navCountStyle, favRemoveStyle, favRowStyle,
    homeNavStyle: navStyle('home'), aiNavStyle: navStyle('ai'), coworkNavStyle: navStyle('cowork'), schedNavStyle: navStyle('schedule'),
    addFavStyle: Object.assign({}, navBase, { height: '34px', color: 'var(--erd-color-text-tertiary)', fontSize: '13px' }),
    favList, catList, favCount: favs().length,

    // view flags
    isHome: st.view === 'home', isAI: st.view === 'ai', isCowork: st.view === 'cowork',
    isSchedule: st.view === 'schedule', isCategory: st.view === 'category', isFavorites: st.view === 'favorites',
    fullArtifact, appMode: !fullArtifact,

    // home
    greeting, openTaskCount,
    todayLine: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
    homeContainerStyle: layouts[st.homeLayout] || layouts.a,
    setLayoutA: () => setState({ homeLayout: 'a' }), setLayoutB: () => setState({ homeLayout: 'b' }), setLayoutC: () => setState({ homeLayout: 'c' }),
    layoutAStyle: segItem(st.homeLayout === 'a'), layoutBStyle: segItem(st.homeLayout === 'b'), layoutCStyle: segItem(st.homeLayout === 'c'),
    taskList,
    todayEvents: [
      { time: '09:00', title: 'Lot L23-118 split review', place: 'Fab 3 · Bay 4', color: '#1677ff' },
      { time: '10:30', title: 'DOE sync — Device team', place: 'Conf B / Zoom', color: '#722ed1' },
      { time: '13:00', title: 'Inline gate: N5 module', place: 'Conf A', color: '#52c41a' },
      { time: '15:30', title: 'TCAD convergence review', place: 'Online', color: '#faad14' },
    ],
    yieldSeries: [{ name: 'Inline', data: [91.2, 92.1, 90.8, 92.6, 93.0, 92.4, 93.3, 93.1, 92.9, 93.6, 93.2, 93.4], color: '#1677ff' }],
    yieldLots: ['107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118'],
    yieldMarks: [{ y: 92, label: 'Target', color: '#faad14', type: 'dashed' }],
    gaugeZones: [[0.5, '#ff4d4f'], [0.7, '#faad14'], [1, '#52c41a']],

    // ai
    aiEmpty: st.aiMessages.length === 0, aiHasMessages: st.aiMessages.length > 0,
    aiMsgs, aiPrompts, robotIcon: ic('ant-design:robot-outlined'), robotAvatar,
    aiInput: st.aiInput, aiStreaming: st.aiStreaming,
    onAiChange: (v) => setState({ aiInput: v }), onAiSubmit: (v) => sendAI(v), onAiCancel: () => setState({ aiStreaming: false }),
    pickPrompt: (item) => sendAI(typeof item === 'string' ? item : item.label),
    newChat: () => setState({ aiMessages: [], aiInput: '', aiStreaming: false }),

    // cowork
    cwFiles: cwFilesV, cwThread: cwThreadV, cwSource: st.cwSource,
    cwInput: st.cwInput, cwGenerating: st.cwGenerating,
    cwDashTabStyle: artTab(st.cwArtifactTab === 'dashboard'), cwSlidesTabStyle: artTab(st.cwArtifactTab === 'slides'),
    cwHistoryOpen: st.cwHistoryOpen, cwHistoryClosed: !st.cwHistoryOpen,
    cwToggleHistory: () => setState((s) => ({ cwHistoryOpen: !s.cwHistoryOpen })),
    cwSessions: cwSessionsV,
    cwNewSession: () => { const id = 'c' + Date.now(); setState((s) => ({ cwSessions: [{ id, title: 'New analysis', time: 'Just now' }].concat(s.cwSessions), cwActiveSession: id, cwThread: [], cwGenerating: false, cwArtifactTab: 'dashboard' })) },
    cwEmpty: st.cwThread.length === 0,
    cwOpenTab: () => { try { const base = window.location.href.split('#')[0]; window.open(base + '#cowork-artifact', '_blank') } catch (e) { /* ignore */ } },
    cwStepItemsLive: (st.cwSteps || []).map((s) => ({ key: s.key, title: s.title, description: s.description, status: s.status })),
    cwShowDash: st.cwThread.length > 0 && st.cwArtifactTab === 'dashboard',
    cwShowSlides: st.cwThread.length > 0 && st.cwArtifactTab === 'slides',
    cwFileCount: st.cwFiles.length, cwHasFiles: st.cwFiles.length > 0, cwNoFiles: st.cwFiles.length === 0,
    cwTotalSize: fmtSize(st.cwFiles.reduce((a, x) => a + (x.sizeBytes || 0), 0)),
    cwFilesPopover: st.cwFilesPopover,
    cwToggleFilesPopover: () => setState((s) => ({ cwFilesPopover: !s.cwFilesPopover })),
    cwCloseFilesPopover: () => setState({ cwFilesPopover: false }),
    cwUploadOpen: st.cwUploadOpen, cwUploadWarn: st.cwUploadWarn,
    cwOpenUpload: () => setState({ cwUploadOpen: true, cwFilesPopover: false, cwPlusOpen: false, cwPlusView: 'root', cwUploadWarn: '' }),
    cwCloseUpload: () => setState({ cwUploadOpen: false, cwUploadWarn: '' }),
    cwBrowse: () => { const el = document.getElementById('cwFileInput'); if (el) el.click() },
    cwPickFiles: (e) => { cwAddFileObjects(e.target.files); e.target.value = '' },
    cwDrop: (e) => { e.preventDefault(); setState({ cwDragActive: false }); cwAddFileObjects(e.dataTransfer.files) },
    cwDragOver: (e) => { e.preventDefault(); if (!stateRef.current.cwDragActive) setState({ cwDragActive: true }) },
    cwDragLeave: (e) => { e.preventDefault(); setState({ cwDragActive: false }) },
    cwDropzoneStyle: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '28px 20px', borderRadius: '12px', cursor: 'pointer', border: '2px dashed ' + (st.cwDragActive ? 'var(--erd-color-primary)' : 'var(--erd-color-primary-border)'), background: st.cwDragActive ? 'var(--erd-color-primary-bg-hover)' : 'var(--erd-color-primary-bg)', transition: 'all .12s' },
    cwPlusOpen: st.cwPlusOpen, cwPlusRoot: st.cwPlusView === 'root', cwPlusSources: st.cwPlusView === 'sources',
    cwPlusToggle: () => setState((s) => ({ cwPlusOpen: !s.cwPlusOpen, cwPlusView: 'root' })),
    cwPlusClose: () => setState({ cwPlusOpen: false, cwPlusView: 'root' }),
    cwAttach: () => setState({ cwUploadOpen: true, cwUploadWarn: '', cwPlusOpen: false, cwPlusView: 'root' }),
    cwShowSources: () => setState({ cwPlusView: 'sources' }),
    cwShowRoot: () => setState({ cwPlusView: 'root' }),
    cwSourceList: ['Inline DB · N5 line', 'SPC Console', 'Inline Explorer', 'Hold Manager', 'TCAD Runner', 'Wafer Map Viewer'].map((src) => ({
      name: src, active: src === st.cwSource,
      onPick: () => setState({ cwSource: src, cwPlusOpen: false, cwPlusView: 'root' }),
      rowStyle: { display: 'flex', alignItems: 'center', gap: '9px', padding: '10px 14px', cursor: 'pointer', fontSize: '13px', color: src === st.cwSource ? 'var(--erd-color-primary)' : 'var(--erd-color-text)', fontWeight: src === st.cwSource ? 600 : 400 },
      checkIcon: 'ant-design:check-outlined',
      checkStyle: { fontSize: '13px', color: 'var(--erd-color-primary)', visibility: src === st.cwSource ? 'visible' : 'hidden' },
    })),
    cwOnInput: (e) => setState({ cwInput: e.target.value }),
    cwOnKey: (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); cwGenerate(stateRef.current.cwInput) } },
    cwSend: () => cwGenerate(stateRef.current.cwInput),
    cwQuickSPC: () => cwGenerate('Run an SPC analysis on Vt (gate CD).'),
    cwQuickPareto: () => cwGenerate('Build a defect pareto from the CSV.'),
    cwQuickTrend: () => cwGenerate('Show a yield trend report for the last 24 lots.'),
    cwQuickSlides: () => cwGenerate('Generate slides from this analysis.'),
    cwSetDash: () => setState({ cwArtifactTab: 'dashboard' }),
    cwSetSlides: () => setState({ cwArtifactTab: 'slides' }),
    cwRegen: () => cwGenerate('Regenerate the dashboard.'),
    cwSlides,

    // schedule
    schedList, schedActiveCount, schedTotal: st.schedJobs.length,
    schedFormOpen: st.schedFormOpen,
    schedNewOpen: () => setState({ schedFormOpen: true }),
    schedClose: () => setState({ schedFormOpen: false }),
    schedName: st.schedForm.name, schedInstruction: st.schedForm.instruction,
    schedSourceV: st.schedForm.source, schedCadenceV: st.schedForm.cadence, schedDeliveryV: st.schedForm.delivery,
    schedSetName: (e) => setState((s) => ({ schedForm: Object.assign({}, s.schedForm, { name: e.target.value }) })),
    schedSetInstruction: (e) => setState((s) => ({ schedForm: Object.assign({}, s.schedForm, { instruction: e.target.value }) })),
    schedSetSource: (e) => setState((s) => ({ schedForm: Object.assign({}, s.schedForm, { source: e.target.value }) })),
    schedSetCadence: (e) => setState((s) => ({ schedForm: Object.assign({}, s.schedForm, { cadence: e.target.value }) })),
    schedSetDelivery: (e) => setState((s) => ({ schedForm: Object.assign({}, s.schedForm, { delivery: e.target.value }) })),
    schedCreate: () => schedCreate(),

    // category
    catChips, catApps, catTitle, catSubtitle, catEmpty: catApps.length === 0,
  }
}

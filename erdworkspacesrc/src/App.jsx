import { createElement as h, useEffect, useReducer } from 'react'
import { css } from './lib/css'
import { useWorkspace } from './state/WorkspaceContext'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Home } from './pages/Home'
import { AI } from './pages/AI'
import { Cowork } from './pages/Cowork'
import { Schedule } from './pages/Schedule'
import { Category } from './pages/Category'
import { Favorites } from './pages/Favorites'
import { FullArtifact } from './pages/FullArtifact'

export default function App() {
  const V = useWorkspace()
  // Re-render when the URL hash changes (drives the full-artifact standalone view).
  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  useEffect(() => {
    window.addEventListener('hashchange', forceUpdate)
    return () => window.removeEventListener('hashchange', forceUpdate)
  }, [])

  if (V.fullArtifact) return h(FullArtifact)

  let page = null
  if (V.isHome) page = h(Home)
  else if (V.isAI) page = h(AI)
  else if (V.isCowork) page = h(Cowork)
  else if (V.isSchedule) page = h(Schedule)
  else if (V.isCategory) page = h(Category)
  else if (V.isFavorites) page = h(Favorites)

  return h('div', { style: css('height:100vh;display:flex;flex-direction:column;overflow:hidden;font-family:var(--erd-font-family);color:var(--erd-color-text);background:var(--erd-color-bg-layout)') },
    h(Header),
    h('div', { style: css('flex:1;display:flex;min-height:0') },
      h(Sidebar),
      h('main', { style: css('flex:1;min-width:0;overflow-y:auto;position:relative') }, page)))
}

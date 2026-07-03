import { createElement as h } from 'react'
import { css } from '../../lib/css'

/* eRD AI Chat · Welcome */
export function Welcome({ icon, title, description }) {
  const surface = 'background:linear-gradient(97deg, var(--erd-blue-1) 0%, rgba(230,244,255,0.35) 100%);border:1px solid var(--erd-color-border-secondary)'
  return h('div', { style: css('display:flex;align-items:center;gap:16px;padding:16px 20px;border-radius:var(--erd-radius-lg);font-family:var(--erd-font-family);' + surface) },
    icon ? h('div', { style: css('width:44px;height:44px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:26px;color:var(--erd-color-primary)') }, icon) : null,
    h('div', { style: css('min-width:0;flex:1') },
      h('div', { style: css('display:flex;align-items:center;gap:8px;font-size:var(--erd-font-size-lg);font-weight:var(--erd-font-weight-strong);color:var(--erd-color-text)') }, title),
      description ? h('div', { style: css('font-size:var(--erd-font-size-base);color:var(--erd-color-text-secondary);margin-top:4px;line-height:1.55') }, description) : null))
}

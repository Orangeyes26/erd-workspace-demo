import { createElement as h } from 'react'
import { css } from '../lib/css'
import { Icon } from '../lib/Icon'
import { useWorkspace } from '../state/WorkspaceContext'

export function Category() {
  const V = useWorkspace()
  return h('div', { style: css('padding:24px 28px 40px;max-width:1240px;margin:0 auto') },
    h('div', { style: css('margin-bottom:18px') },
      h('h1', { style: css('margin:0;font-size:24px;font-weight:600;letter-spacing:-.3px') }, V.catTitle),
      h('p', { style: css('margin:6px 0 0;font-size:14px;color:var(--erd-color-text-secondary)') }, V.catSubtitle)),
    h('div', { style: css('display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px') },
      V.catChips.map((c, i) => h('div', { key: i, onClick: c.onSelect, style: c.chipStyle }, Icon(c.icon, 'font-size:14px'), c.name))),
    h('div', { style: css('display:grid;grid-template-columns:repeat(auto-fill,minmax(268px,1fr));gap:14px') },
      V.catApps.map((a, i) => h('div', { key: i, className: 'erd-tile', onClick: a.onOpen, style: css('position:relative;background:#fff;border:1px solid var(--erd-color-border-secondary);border-radius:11px;padding:16px;cursor:pointer;transition:all .15s') },
        h('div', { style: css('display:flex;align-items:flex-start;gap:12px') },
          h('div', { style: css('width:42px;height:42px;border-radius:10px;background:var(--erd-color-primary-bg);color:var(--erd-color-primary);display:flex;align-items:center;justify-content:center;font-size:20px;flex:none') }, Icon(a.icon)),
          h('div', { style: css('flex:1;min-width:0;padding-right:22px') },
            h('div', { style: css('font-size:14px;font-weight:600;line-height:1.3') }, a.name),
            h('div', { style: css('font-size:12px;color:var(--erd-color-text-secondary);line-height:1.5;margin-top:4px') }, a.desc),
            h('div', { style: css('margin-top:9px') }, h('span', { style: css('font-size:11px;color:var(--erd-color-text-tertiary);background:var(--erd-color-fill-tertiary);padding:2px 8px;border-radius:5px') }, a.catName)))),
        h('span', { className: 'erd-star', onClick: a.onToggle, title: 'Toggle favorite', style: Object.assign({ position: 'absolute', top: '14px', right: '14px', fontSize: '18px', cursor: 'pointer', transition: 'transform .12s' }, css(a.starColor)) }, Icon(a.starIcon)))),
      V.catEmpty ? h('div', { style: css('text-align:center;padding:60px 20px;color:var(--erd-color-text-tertiary)') }, Icon('ant-design:inbox-outlined', 'font-size:40px'), h('div', { style: css('margin-top:10px;font-size:14px') }, 'No apps match "' + V.search + '".')) : null)
  )
}

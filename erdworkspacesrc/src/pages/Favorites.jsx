import { createElement as h } from 'react'
import { css } from '../lib/css'
import { Icon } from '../lib/Icon'
import { useWorkspace } from '../state/WorkspaceContext'

export function Favorites() {
  const V = useWorkspace()
  return h('div', { style: css('padding:24px 28px 40px;max-width:1100px;margin:0 auto') },
    h('div', { style: css('display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px') },
      h('div', null,
        h('h1', { style: css('margin:0;font-size:24px;font-weight:600;letter-spacing:-.3px') }, 'My Favorites'),
        h('p', { style: css('margin:6px 0 0;font-size:14px;color:var(--erd-color-text-secondary)') }, 'Pin up to 20 apps for one-click access. ' + V.favCount + ' of 20 used.')),
      h('div', { className: 'erd-icon-btn', onClick: V.goBrowse, style: css('display:flex;align-items:center;gap:7px;height:34px;padding:0 14px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:500;background:var(--erd-color-primary);color:#fff') }, Icon('ant-design:appstore-add-outlined'), 'Add apps')),
    h('div', { style: css('display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px') },
      V.favList.map((f) => h('div', { key: f.id, className: 'erd-tile', onClick: f.onOpen, style: css('position:relative;background:#fff;border:1px solid var(--erd-color-border-secondary);border-radius:10px;padding:15px;cursor:pointer;transition:all .15s') },
        h('div', { style: css('display:flex;align-items:center;gap:11px') },
          h('div', { style: css('width:38px;height:38px;border-radius:9px;background:var(--erd-color-primary-bg);color:var(--erd-color-primary);display:flex;align-items:center;justify-content:center;font-size:18px;flex:none') }, Icon(f.icon)),
          h('div', { style: css('flex:1;min-width:0') }, h('div', { style: css('font-size:13.5px;font-weight:600') }, f.name), h('div', { style: css('font-size:11px;color:var(--erd-color-text-tertiary)') }, f.catName))),
        h('span', { className: 'erd-fav-remove', onClick: f.onRemove, style: css('position:absolute;top:12px;right:12px;width:24px;height:24px;display:flex;align-items:center;justify-content:center;border-radius:6px;color:var(--erd-color-text-quaternary);font-size:13px') }, Icon('ant-design:close-outlined')))),
      h('div', { className: 'erd-tile', onClick: V.goBrowse, style: css('display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;min-height:82px;padding:15px;border:1px dashed var(--erd-color-border);border-radius:10px;cursor:pointer;color:var(--erd-color-text-tertiary);font-size:13px;transition:all .15s') }, Icon('ant-design:plus-outlined', 'font-size:20px'), 'Add from apps'))
  )
}

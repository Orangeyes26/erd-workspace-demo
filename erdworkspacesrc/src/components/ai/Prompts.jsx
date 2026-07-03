import { createElement as h } from 'react'
import { css } from '../../lib/css'

function PromptItem({ item, onClick }) {
  return h('div', { className: 'erd-prompt', onClick: () => !item.disabled && onClick && onClick(item),
    style: css('display:flex;align-items:flex-start;gap:10px;flex:0 1 auto;max-width:320px;padding:12px 14px;border-radius:var(--erd-radius-lg);border:1px solid var(--erd-color-border-secondary);background:#fff;cursor:pointer;transition:all .15s') },
    item.icon ? h('span', { style: css('color:var(--erd-color-primary);font-size:18px;margin-top:1px;flex:none') }, item.icon) : null,
    h('div', { style: css('min-width:0') },
      h('div', { style: css('font-size:var(--erd-font-size-base);font-weight:var(--erd-font-weight-medium);color:var(--erd-color-text)') }, item.label),
      item.description ? h('div', { style: css('font-size:var(--erd-font-size-sm);color:var(--erd-color-text-tertiary);margin-top:2px;line-height:1.45') }, item.description) : null))
}

/* eRD AI Chat · Prompts */
export function Prompts({ items, title, onItemClick }) {
  return h('div', { style: css('font-family:var(--erd-font-family)') },
    title ? h('div', { style: css('font-size:var(--erd-font-size-base);color:var(--erd-color-text-secondary);margin-bottom:12px') }, title) : null,
    h('div', { style: css('display:flex;flex-direction:row;flex-wrap:wrap;gap:12px') },
      (items || []).map((it, i) => h(PromptItem, { key: it.key || i, item: it, onClick: onItemClick }))))
}

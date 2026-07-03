import { createElement as h } from 'react'
import { css } from '../../lib/css'
import { Icon } from '../../lib/Icon'

const STATUS = {
  pending: { icon: 'ant-design:clock-circle-outlined', color: 'var(--erd-color-text-quaternary)' },
  running: { icon: 'ant-design:loading-outlined', color: 'var(--erd-color-primary)', spin: true },
  success: { icon: 'ant-design:check-circle-fill', color: 'var(--erd-color-success)' },
  error: { icon: 'ant-design:close-circle-fill', color: 'var(--erd-color-error)' },
}

/* eRD AI Chat · ThoughtChain — vertical chain of reasoning / tool steps. */
export function ThoughtChain({ items = [] }) {
  return h('div', { style: css('font-family:var(--erd-font-family)') },
    items.map((it, i) => {
      const st = STATUS[it.status || 'pending']
      const last = i === items.length - 1
      return h('div', { key: it.key || i, style: css('display:flex;gap:12px') },
        h('div', { style: css('display:flex;flex-direction:column;align-items:center') },
          h('span', { className: st.spin ? 'erd-spin' : undefined, style: { width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: st.color } },
            Icon(st.icon)),
          !last ? h('span', { style: css('flex:1;width:2px;background:var(--erd-color-border-secondary);margin:2px 0') }) : null),
        h('div', { style: { flex: 1, paddingBottom: last ? 0 : 16, minWidth: 0 } },
          h('div', { style: css('display:flex;align-items:center;gap:6px;min-height:24px') },
            h('span', { style: css('font-size:var(--erd-font-size-base);font-weight:var(--erd-font-weight-medium);color:var(--erd-color-text)') }, it.title)),
          it.description ? h('div', { style: css('font-size:var(--erd-font-size-sm);color:var(--erd-color-text-tertiary);margin-top:2px') }, it.description) : null))
    }))
}

import { createElement as h } from 'react'
import { css } from '../../lib/css'
import { Icon } from '../../lib/Icon'

/* eRD AI Chat · Bubble */
export function Bubble({ placement = 'start', content = '', header = null, avatar = null, loading = false }) {
  const isEnd = placement === 'end'
  const surf = isEnd
    ? 'background:var(--erd-bubble-user-bg);color:var(--erd-bubble-user-text)'
    : 'background:var(--erd-bubble-ai-bg);color:var(--erd-bubble-ai-text)'
  return h('div', { style: css('display:flex;flex-direction:' + (isEnd ? 'row-reverse' : 'row') + ';align-items:flex-start;gap:12px;max-width:100%') },
    avatar,
    h('div', { style: css('display:flex;flex-direction:column;align-items:' + (isEnd ? 'flex-end' : 'flex-start') + ';min-width:0;gap:4px') },
      header ? h('div', { style: css('font-size:12px;color:var(--erd-color-text-tertiary);font-weight:500') }, header) : null,
      h('div', { style: css('max-width:100%;padding:10px 14px;border-radius:var(--erd-bubble-radius);font-size:14px;line-height:1.6;white-space:pre-wrap;word-break:break-word;' + surf) },
        loading
          ? h('span', { style: css('display:inline-flex;gap:6px;align-items:center;color:var(--erd-color-text-tertiary)') },
              h('span', { className: 'erd-spin', style: css('display:inline-flex;color:var(--erd-color-primary)') }, Icon('ant-design:loading-outlined', 'font-size:15px')), 'Thinking…')
          : content)))
}

import { createElement as h } from 'react'
import { css } from '../../lib/css'

/* eRD Charting · StatTile — KPI card with IBM Plex Mono numerals + tone color. */
export function StatTile({ label, value, unit = '', delta = null, deltaDirection = 'up', tone = 'neutral' }) {
  const toneColor = { neutral: 'var(--text-primary)', pass: 'var(--signal-pass)', fail: 'var(--signal-fail)', warn: 'var(--signal-warn)' }[tone]
  const arrow = deltaDirection === 'up' ? '▲' : deltaDirection === 'down' ? '▼' : '—'
  const deltaColor = deltaDirection === 'flat' ? 'var(--text-muted)' : deltaDirection === 'up' ? 'var(--signal-pass)' : 'var(--signal-fail)'
  return h('div', { style: css('display:flex;flex-direction:column;gap:var(--space-3);padding:var(--space-6);background:var(--surface-card);border:var(--hairline) solid var(--border-subtle);border-radius:var(--radius-md);box-shadow:var(--shadow-sm);min-width:0') },
    h('span', { style: css('font-family:var(--font-sans);font-size:var(--text-2xs);font-weight:var(--weight-semibold);letter-spacing:var(--tracking-caps);text-transform:uppercase;color:var(--text-muted)') }, label),
    h('div', { style: css('display:flex;align-items:baseline;gap:var(--space-3)') },
      h('span', { style: css("font-family:var(--font-mono);font-size:var(--text-3xl);font-weight:var(--weight-bold);line-height:1;color:" + toneColor + ";font-feature-settings:'tnum' 1") },
        value, unit ? h('span', { style: css('font-size:var(--text-lg);font-weight:var(--weight-medium);color:var(--text-muted);margin-left:2px') }, unit) : null)),
    delta != null ? h('span', { style: css('font-family:var(--font-mono);font-size:var(--text-xs);color:' + deltaColor + ';display:inline-flex;align-items:center;gap:4px') }, arrow + ' ' + delta) : null)
}

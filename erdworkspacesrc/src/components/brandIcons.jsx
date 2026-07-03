import { createElement as h } from 'react'

/* The eRD AI star (used for eRD AI) and the Cowork sparkle — inline SVG so they
   match the prototype exactly rather than depending on an icon set. */
export function StarIcon({ size = 20, fill = 'currentColor' }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill, style: { flex: 'none' } },
    h('path', { d: 'M12 2l1.5 8.5L22 12l-8.5 1.5L12 22l-1.5-8.5L2 12l8.5-1.5z' }))
}

export function SparkleIcon({ size = 20, fill = 'currentColor' }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill, style: { flex: 'none' } },
    h('path', { d: 'M10 2l1.3 6.2L17.5 9.5l-6.2 1.3L10 17l-1.3-6.2L2.5 9.5l6.2-1.3z' }),
    h('path', { d: 'M17.6 12.6l.7 3.1 3.2.7-3.2.7-.7 3.2-.7-3.2-3.1-.7 3.1-.7z' }))
}

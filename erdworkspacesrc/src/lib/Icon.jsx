import { createElement as h } from 'react'
import { Icon as Iconify } from '@iconify/react'
import { css } from './css'

/* Thin wrapper over @iconify/react. Callable as Icon('ant-design:home-outlined', 'font-size:18px')
   to match the prototype's usage, or as <Icon icon=... style=... /> as a component. */
export function Icon(icon, style) {
  if (icon && typeof icon === 'object') {
    // JSX component form: <Icon icon="..." style={...} className="..." />
    const { icon: name, style: st, ...rest } = icon
    return h(Iconify, { icon: name, style: st ? css(st) : undefined, ...rest })
  }
  return h(Iconify, { icon, style: style ? css(style) : undefined })
}

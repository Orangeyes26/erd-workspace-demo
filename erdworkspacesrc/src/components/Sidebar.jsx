import { createElement as h } from 'react'
import { css } from '../lib/css'
import { Icon } from '../lib/Icon'
import { StarIcon, SparkleIcon } from './brandIcons'
import { useWorkspace } from '../state/WorkspaceContext'

export function Sidebar() {
  const V = useWorkspace()
  return h('aside', { style: V.sidebarStyle },
    h('div', { style: css('flex:1;overflow-y:auto;padding:12px 10px;display:flex;flex-direction:column;gap:4px') },
      h('div', { className: 'erd-navrow', onClick: V.goHome, style: V.homeNavStyle }, Icon('ant-design:home-outlined', 'font-size:18px;flex:none'), h('span', { style: V.labelStyle }, 'Home')),
      h('div', { className: 'erd-navrow', onClick: V.goAI, style: V.aiNavStyle }, h(StarIcon, { size: 19, fill: 'currentColor' }), h('span', { style: V.labelStyle }, 'eRD AI')),
      h('div', { className: 'erd-navrow', onClick: V.goCowork, style: V.coworkNavStyle }, h(SparkleIcon, { size: 19, fill: 'currentColor' }), h('span', { style: V.labelStyle }, 'Cowork')),
      h('div', { className: 'erd-navrow', onClick: V.goSchedule, style: V.schedNavStyle }, Icon('ant-design:calendar-outlined', 'font-size:18px;flex:none'), h('span', { style: V.labelStyle }, 'Schedule')),
      h('div', { style: V.sectionStyle }, h('span', null, 'My Favorites'), h('span', { style: css('color:var(--erd-color-text-tertiary);font-weight:500') }, V.favCount + '/20')),
      V.favList.map((f) => h('div', { key: f.id, className: 'erd-navrow', onClick: f.onOpen, style: V.favRowStyle },
        Icon({ icon: f.icon, style: 'font-size:16px;flex:none;color:var(--erd-color-text-tertiary)' }),
        h('span', { style: V.navLabelFlex }, f.name),
        h('span', { className: 'erd-fav-remove', onClick: f.onRemove, style: V.favRemoveStyle, title: 'Remove' }, Icon('ant-design:close-outlined')))),
      h('div', { className: 'erd-navrow', onClick: V.goBrowse, style: V.addFavStyle }, Icon('ant-design:plus-outlined', 'font-size:15px;flex:none'), h('span', { style: V.labelStyle }, 'Add from apps…')),
      h('div', { style: V.sectionStyle }, h('span', null, 'App Categories'), h('span', { style: css('color:var(--erd-color-text-tertiary);font-weight:500') }, '7')),
      V.catList.map((c) => h('div', { key: c.id, className: 'erd-navrow', onClick: c.onOpen, style: c.rowStyle },
        Icon({ icon: c.icon, style: 'font-size:17px;flex:none' }),
        h('span', { style: V.navLabelFlex }, c.name),
        h('span', { style: V.navCountStyle }, c.count)))))
}

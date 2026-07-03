import { createElement as h } from 'react'
import { css } from '../lib/css'
import { Icon } from '../lib/Icon'
import { StarIcon } from './brandIcons'
import { useWorkspace } from '../state/WorkspaceContext'

export function Header() {
  const V = useWorkspace()
  return h('header', { style: css('height:56px;flex:none;display:flex;align-items:center;gap:16px;padding:0 16px;background:#fff;border-bottom:1px solid var(--erd-color-border-secondary);position:relative;z-index:30') },
    h('div', { className: 'erd-icon-btn', onClick: V.toggleSidebar, style: css('width:34px;height:34px;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;color:var(--erd-color-text-secondary);font-size:18px') }, Icon('ant-design:menu-outlined')),
    h('div', { onClick: V.goHome, style: css('display:flex;align-items:center;gap:10px;cursor:pointer;user-select:none') },
      h('div', { style: css('width:32px;height:32px;border-radius:8px;background:var(--erd-color-primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;letter-spacing:-.5px') }, 'eRD'),
      h('div', { style: css('display:flex;flex-direction:column;line-height:1.05') },
        h('span', { style: css('font-weight:600;font-size:15px;letter-spacing:-.2px') }, 'Workspace'),
        h('span', { style: css('font-size:10px;color:var(--erd-color-text-tertiary);letter-spacing:.3px') }, 'R&D platform'))),
    h('div', { style: css('flex:1;max-width:520px;margin:0 auto;position:relative') },
      Icon('ant-design:search-outlined', 'position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--erd-color-text-tertiary);font-size:15px'),
      h('input', { value: V.search, onChange: V.onSearch, placeholder: 'Search apps, lots, routes, docs…', style: css('width:100%;height:36px;border:1px solid var(--erd-color-border);border-radius:18px;background:var(--erd-color-fill-quaternary);padding:0 44px 0 36px;font-size:13px;color:var(--erd-color-text);outline:none') }),
      h('span', { style: css('position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:11px;color:var(--erd-color-text-tertiary);border:1px solid var(--erd-color-border);border-radius:4px;padding:1px 5px') }, '⌘K')),
    h('div', { style: css('display:flex;align-items:center;gap:6px') },
      h('div', { className: 'erd-icon-btn', onClick: V.goAI, style: css('display:flex;align-items:center;gap:6px;height:34px;padding:0 12px;border-radius:17px;cursor:pointer;background:var(--erd-color-primary-bg);color:var(--erd-color-primary);font-size:13px;font-weight:500') }, h(StarIcon, { size: 16, fill: 'currentColor' }), h('span', null, 'Ask eRD AI')),
      h('div', { style: css('display:flex;border:1px solid var(--erd-color-border);border-radius:8px;overflow:hidden;height:32px') },
        h('div', { onClick: V.setLangEn, style: V.langEnStyle }, 'EN'),
        h('div', { onClick: V.setLangZh, style: V.langZhStyle }, '中')),
      h('div', { className: 'erd-icon-btn', onClick: V.toggleNotif, style: css('position:relative;width:34px;height:34px;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;color:var(--erd-color-text-secondary);font-size:18px') },
        Icon('ant-design:bell-outlined'),
        h('span', { style: css('position:absolute;top:5px;right:5px;min-width:15px;height:15px;padding:0 3px;background:var(--erd-color-error);color:#fff;border-radius:8px;font-size:9px;font-weight:600;display:flex;align-items:center;justify-content:center;border:1.5px solid #fff') }, '3')),
      h('div', { className: 'erd-icon-btn', onClick: V.toggleUserMenu, style: css('display:flex;align-items:center;gap:7px;height:34px;padding:2px 8px 2px 2px;border-radius:18px;cursor:pointer') },
        h('div', { style: css('width:30px;height:30px;border-radius:50%;background:var(--erd-blue-7);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600') }, 'KL'),
        Icon('ant-design:down-outlined', 'font-size:11px;color:var(--erd-color-text-tertiary)'))),
    V.notifOpen ? h('div', null,
      h('div', { onClick: V.closeMenus, style: css('position:fixed;inset:0;z-index:35') }),
      h('div', { style: css('position:absolute;top:52px;right:120px;width:340px;background:#fff;border:1px solid var(--erd-color-border-secondary);border-radius:12px;box-shadow:0 6px 24px rgba(0,0,0,.12);z-index:40;overflow:hidden') },
        h('div', { style: css('padding:14px 16px;border-bottom:1px solid var(--erd-color-border-secondary);display:flex;justify-content:space-between;align-items:center') },
          h('span', { style: css('font-weight:600;font-size:14px') }, 'Notifications'),
          h('span', { style: css('font-size:12px;color:var(--erd-color-primary);cursor:pointer') }, 'Mark all read')),
        V.notifications.map((n, i) => h('div', { key: i, className: 'erd-navrow', style: css('display:flex;gap:11px;padding:12px 16px;cursor:pointer;border-bottom:1px solid var(--erd-color-fill-quaternary)') },
          Icon({ icon: n.icon, style: 'font-size:16px;color:' + n.color + ';margin-top:2px' }),
          h('div', { style: css('flex:1;min-width:0') },
            h('div', { style: css('font-size:13px;color:var(--erd-color-text);line-height:1.45') }, n.text),
            h('div', { style: css('font-size:11px;color:var(--erd-color-text-tertiary);margin-top:3px') }, n.time))))))
      : null,
    V.userMenuOpen ? h('div', null,
      h('div', { onClick: V.closeMenus, style: css('position:fixed;inset:0;z-index:35') }),
      h('div', { style: css('position:absolute;top:52px;right:12px;width:230px;background:#fff;border:1px solid var(--erd-color-border-secondary);border-radius:12px;box-shadow:0 6px 24px rgba(0,0,0,.12);z-index:40;overflow:hidden') },
        h('div', { style: css('padding:14px 16px;border-bottom:1px solid var(--erd-color-border-secondary)') },
          h('div', { style: css('font-weight:600;font-size:14px') }, 'Karen Lin'),
          h('div', { style: css('font-size:12px;color:var(--erd-color-text-tertiary)') }, 'Process Integration · Fab 3')),
        h('div', { className: 'erd-navrow', style: css('display:flex;align-items:center;gap:10px;padding:11px 16px;cursor:pointer;font-size:13px') }, Icon('ant-design:user-outlined'), 'Profile'),
        h('div', { className: 'erd-navrow', style: css('display:flex;align-items:center;gap:10px;padding:11px 16px;cursor:pointer;font-size:13px') }, Icon('ant-design:setting-outlined'), 'Settings'),
        h('div', { className: 'erd-navrow', style: css('display:flex;align-items:center;gap:10px;padding:11px 16px;cursor:pointer;font-size:13px;color:var(--erd-color-error);border-top:1px solid var(--erd-color-fill-quaternary)') }, Icon('ant-design:logout-outlined'), 'Sign out')))
      : null)
}

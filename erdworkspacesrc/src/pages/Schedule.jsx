import { createElement as h } from 'react'
import { css } from '../lib/css'
import { Icon } from '../lib/Icon'
import { useWorkspace } from '../state/WorkspaceContext'

const SOURCES = ['Inline DB · N5 line', 'SPC Console', 'Inline Explorer', 'Hold Manager', 'TCAD Runner', 'Wafer Map Viewer']
const CADENCES = ['Every weekday · 07:30', 'Every Monday · 08:00', 'Every 2 hours', 'Every 6 hours', 'Daily · 18:00']
const DELIVERIES = ['Home feed', 'Home feed + Email', 'Cowork', 'Cowork + Email', 'Email']
const selStyle = 'width:100%;height:38px;border:1px solid var(--erd-color-border);border-radius:8px;padding:0 10px;font-size:13px;outline:none;background:#fff;color:var(--erd-color-text)'

export function Schedule() {
  const V = useWorkspace()
  return h('div', null,
    h('div', { style: css('padding:24px 28px 40px;max-width:1040px;margin:0 auto') },
      h('div', { style: css('display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:18px;flex-wrap:wrap;gap:12px') },
        h('div', null,
          h('h1', { style: css('margin:0;font-size:24px;font-weight:600;letter-spacing:-.3px') }, 'Schedule'),
          h('p', { style: css('margin:6px 0 0;font-size:14px;color:var(--erd-color-text-secondary)') }, 'Let eRD AI run recurring tasks on your data — on a cadence you set.')),
        h('div', { className: 'erd-icon-btn', onClick: V.schedNewOpen, style: css('display:flex;align-items:center;gap:7px;height:36px;padding:0 15px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:500;background:var(--erd-color-primary);color:#fff') }, Icon('ant-design:plus-outlined'), 'New schedule')),
      h('div', { style: css('display:flex;gap:10px;margin-bottom:18px;flex-wrap:wrap') },
        h('div', { style: css('display:inline-flex;align-items:center;gap:7px;font-size:12.5px;color:var(--erd-color-text-secondary);background:#fff;border:1px solid var(--erd-color-border-secondary);border-radius:16px;padding:6px 13px') }, h('span', { style: css('width:7px;height:7px;border-radius:50%;background:var(--erd-color-success)') }), V.schedActiveCount + ' active'),
        h('div', { style: css('display:inline-flex;align-items:center;gap:7px;font-size:12.5px;color:var(--erd-color-text-secondary);background:#fff;border:1px solid var(--erd-color-border-secondary);border-radius:16px;padding:6px 13px') }, Icon('ant-design:robot-outlined', 'color:var(--erd-color-primary)'), V.schedTotal + ' scheduled jobs'),
        h('div', { style: css('display:inline-flex;align-items:center;gap:7px;font-size:12.5px;color:var(--erd-color-text-secondary);background:#fff;border:1px solid var(--erd-color-border-secondary);border-radius:16px;padding:6px 13px') }, Icon('ant-design:clock-circle-outlined', 'color:var(--erd-color-text-tertiary)'), 'Next run in 58 min')),
      h('div', { style: css('display:flex;flex-direction:column;gap:12px') },
        V.schedList.map((j) => h('div', { key: j.id, style: j.cardStyle },
          h('div', { style: css('display:flex;align-items:center;gap:12px') },
            h('div', { style: css('width:40px;height:40px;border-radius:10px;background:var(--erd-color-primary-bg);color:var(--erd-color-primary);display:flex;align-items:center;justify-content:center;font-size:19px;flex:none') }, Icon(j.icon)),
            h('div', { style: css('flex:1;min-width:0') },
              h('div', { style: css('display:flex;align-items:center;gap:9px') }, h('span', { style: css('font-size:14.5px;font-weight:600') }, j.name), h('span', { style: css('font-size:11px;color:var(--erd-color-text-secondary);background:var(--erd-color-fill-tertiary);padding:2px 8px;border-radius:5px;display:inline-flex;align-items:center;gap:4px') }, Icon('ant-design:sync-outlined', 'font-size:11px'), j.cadence))),
            h('div', { className: 'erd-icon-btn', onClick: j.onRun, style: css('display:flex;align-items:center;gap:6px;height:30px;padding:0 11px;border-radius:7px;cursor:pointer;font-size:12px;color:var(--erd-color-text-secondary);border:1px solid var(--erd-color-border)') }, Icon('ant-design:caret-right-outlined'), 'Run now'),
            h('div', { onClick: j.onToggle, style: j.switchStyle }, h('div', { style: j.knobStyle }))),
          h('div', { style: css('margin:11px 0 12px;padding:10px 13px;background:var(--erd-color-fill-quaternary);border-radius:8px;font-size:13px;line-height:1.55;color:var(--erd-color-text-secondary);display:flex;gap:8px') }, Icon('ant-design:message-outlined', 'color:var(--erd-color-text-tertiary);font-size:14px;margin-top:2px;flex:none'), h('span', null, j.instruction)),
          h('div', { style: css('display:flex;flex-wrap:wrap;gap:18px;font-size:12px;color:var(--erd-color-text-tertiary)') },
            h('div', { style: css('display:flex;align-items:center;gap:6px') }, Icon('ant-design:database-outlined'), j.target),
            h('div', { style: css('display:flex;align-items:center;gap:6px') }, Icon('ant-design:send-outlined'), j.delivery),
            h('div', { style: css('display:flex;align-items:center;gap:6px') }, h('span', { style: { width: '7px', height: '7px', borderRadius: '50%', background: j.lastDot } }), 'Last: ', h('span', { style: css('color:var(--erd-color-text-secondary)') }, j.lastText), ' · ' + j.lastTime),
            h('div', { style: css('display:flex;align-items:center;gap:6px;margin-left:auto') }, Icon('ant-design:clock-circle-outlined'), 'Next: ' + j.next)))))),

    V.schedFormOpen ? h('div', null,
      h('div', { onClick: V.schedClose, style: css('position:fixed;inset:0;background:var(--erd-color-bg-mask);z-index:50') }),
      h('div', { style: css('position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:540px;max-width:calc(100vw - 40px);max-height:calc(100vh - 60px);overflow-y:auto;background:#fff;border-radius:14px;box-shadow:0 12px 48px rgba(0,0,0,.2);z-index:51') },
        h('div', { style: css('padding:18px 22px;border-bottom:1px solid var(--erd-color-border-secondary);display:flex;align-items:center;justify-content:space-between') },
          h('div', { style: css('display:flex;align-items:center;gap:9px;font-weight:600;font-size:16px') }, Icon('ant-design:robot-outlined', 'color:var(--erd-color-primary)'), 'New AI schedule'),
          h('span', { className: 'erd-icon-btn', onClick: V.schedClose, style: css('width:30px;height:30px;display:flex;align-items:center;justify-content:center;border-radius:7px;cursor:pointer;color:var(--erd-color-text-tertiary)') }, Icon('ant-design:close-outlined'))),
        h('div', { style: css('padding:20px 22px;display:flex;flex-direction:column;gap:16px') },
          h('div', null, h('div', { style: css('font-size:12.5px;font-weight:600;margin-bottom:6px') }, 'Name'),
            h('input', { value: V.schedName, onChange: V.schedSetName, placeholder: 'e.g. Overnight defect digest', style: css('width:100%;height:38px;border:1px solid var(--erd-color-border);border-radius:8px;padding:0 12px;font-size:13px;outline:none;color:var(--erd-color-text)') })),
          h('div', null, h('div', { style: css('font-size:12.5px;font-weight:600;margin-bottom:6px') }, 'Instruction to eRD AI'),
            h('textarea', { value: V.schedInstruction, onChange: V.schedSetInstruction, placeholder: 'Describe what eRD AI should do each run — e.g. “Summarize new defect maps and flag any cluster signature.”', rows: 3, style: css('width:100%;border:1px solid var(--erd-color-border);border-radius:8px;padding:10px 12px;font-size:13px;line-height:1.55;outline:none;resize:vertical;color:var(--erd-color-text)') })),
          h('div', { style: css('display:grid;grid-template-columns:1fr 1fr;gap:14px') },
            h('div', null, h('div', { style: css('font-size:12.5px;font-weight:600;margin-bottom:6px') }, 'Data source'),
              h('select', { value: V.schedSourceV, onChange: V.schedSetSource, style: css(selStyle) }, SOURCES.map((o, i) => h('option', { key: i }, o)))),
            h('div', null, h('div', { style: css('font-size:12.5px;font-weight:600;margin-bottom:6px') }, 'Cadence'),
              h('select', { value: V.schedCadenceV, onChange: V.schedSetCadence, style: css(selStyle) }, CADENCES.map((o, i) => h('option', { key: i }, o))))),
          h('div', null, h('div', { style: css('font-size:12.5px;font-weight:600;margin-bottom:6px') }, 'Deliver to'),
            h('select', { value: V.schedDeliveryV, onChange: V.schedSetDelivery, style: css(selStyle) }, DELIVERIES.map((o, i) => h('option', { key: i }, o))))),
        h('div', { style: css('padding:16px 22px;border-top:1px solid var(--erd-color-border-secondary);display:flex;justify-content:flex-end;gap:10px') },
          h('div', { className: 'erd-icon-btn', onClick: V.schedClose, style: css('height:36px;padding:0 16px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--erd-color-text-secondary);border:1px solid var(--erd-color-border);display:flex;align-items:center') }, 'Cancel'),
          h('div', { onClick: V.schedCreate, style: css('height:36px;padding:0 18px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:500;background:var(--erd-color-primary);color:#fff;display:flex;align-items:center;gap:7px') }, Icon('ant-design:check-outlined'), 'Create schedule')))) : null
  )
}

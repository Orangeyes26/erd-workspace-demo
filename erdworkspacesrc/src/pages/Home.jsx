import { createElement as h } from 'react'
import { css } from '../lib/css'
import { Icon } from '../lib/Icon'
import { useWorkspace } from '../state/WorkspaceContext'
import { StatTile } from '../components/charts/StatTile'
import { LineChart } from '../components/charts/LineChart'
import { GaugeChart } from '../components/charts/GaugeChart'

export function Home() {
  const V = useWorkspace()
  return h('div', { style: css('padding:24px 28px 40px;max-width:1320px;margin:0 auto') },
    h('div', { style: css('display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:20px') },
      h('div', null,
        h('h1', { style: css('margin:0;font-size:26px;font-weight:600;letter-spacing:-.4px') }, V.greeting + ', Karen'),
        h('p', { style: css('margin:6px 0 0;font-size:14px;color:var(--erd-color-text-secondary)') }, V.todayLine + ' · You have ' + V.openTaskCount + ' open tasks and 3 events today.')),
      h('div', { style: css('display:flex;align-items:center;gap:10px') },
        h('span', { style: css('font-size:12px;color:var(--erd-color-text-tertiary)') }, 'Layout'),
        h('div', { style: css('display:flex;border:1px solid var(--erd-color-border);border-radius:9px;overflow:hidden') },
          h('div', { onClick: V.setLayoutA, style: V.layoutAStyle }, 'Focus'),
          h('div', { onClick: V.setLayoutB, style: V.layoutBStyle }, 'Dashboard'),
          h('div', { onClick: V.setLayoutC, style: V.layoutCStyle }, 'Launchpad')))),
    h('div', { style: V.homeContainerStyle },
      h('div', { style: css('grid-area:kpi;display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px') },
        h(StatTile, { label: 'Inline', value: '93.4', unit: '%', delta: '1.2 pts vs last wk', deltaDirection: 'up', tone: 'pass' }),
        h(StatTile, { label: 'Cpk (Vt)', value: '1.34', delta: '0.06', deltaDirection: 'up', tone: 'pass' }),
        h(StatTile, { label: 'Tool utilization', value: '87', unit: '%', delta: '3 pts', deltaDirection: 'up', tone: 'neutral' }),
        h(StatTile, { label: 'WIP lots at risk', value: '6', delta: '2', deltaDirection: 'down', tone: 'warn' })),
      h('div', { style: css('grid-area:yield;background:#fff;border:1px solid var(--erd-color-border-secondary);border-radius:10px;box-shadow:0 1px 2px rgba(0,0,0,.03);overflow:hidden') },
        h('div', { style: css('display:flex;align-items:center;justify-content:space-between;padding:14px 18px 6px') },
          h('div', null,
            h('div', { style: css('font-size:10px;letter-spacing:.6px;text-transform:uppercase;color:var(--erd-color-text-tertiary);font-weight:600') }, 'Inline'),
            h('div', { style: css('font-size:15px;font-weight:600;margin-top:2px') }, 'Inline — trailing 12 lots')),
          h('span', { onClick: V.openYieldExplorer, style: css('font-size:12px;color:var(--erd-color-primary);cursor:pointer;font-weight:500') }, 'Open Inline Explorer →')),
        h('div', { style: css('display:flex;flex-wrap:wrap;gap:8px;padding:4px 10px 12px;align-items:center') },
          h('div', { style: css('flex:1;min-width:340px') }, h(LineChart, { series: V.yieldSeries, xData: V.yieldLots, markLines: V.yieldMarks, yName: '%', area: true, height: 210 })),
          h('div', { style: css('width:230px;flex:none') }, h(GaugeChart, { value: 93.4, min: 85, max: 100, label: 'Inline', unit: '%', zones: V.gaugeZones, precision: 1, height: 200 })))),
      h('div', { style: css('grid-area:sched;background:#fff;border:1px solid var(--erd-color-border-secondary);border-radius:10px;box-shadow:0 1px 2px rgba(0,0,0,.03);padding:16px 18px') },
        h('div', { style: css('display:flex;align-items:center;justify-content:space-between;margin-bottom:12px') },
          h('div', { style: css('font-size:15px;font-weight:600') }, 'Today'),
          h('span', { onClick: V.goSchedule, style: css('font-size:12px;color:var(--erd-color-primary);cursor:pointer;font-weight:500') }, 'Full schedule')),
        V.todayEvents.map((e, i) => h('div', { key: i, style: css('display:flex;gap:12px;padding:9px 0;border-bottom:1px solid var(--erd-color-fill-quaternary)') },
          h('div', { style: css('font-family:var(--erd-font-family-code,monospace);font-size:12px;color:var(--erd-color-text-secondary);width:46px;flex:none;font-variant-numeric:tabular-nums') }, e.time),
          h('div', { style: { width: '3px', borderRadius: '2px', background: e.color, flex: 'none' } }),
          h('div', { style: css('flex:1;min-width:0') },
            h('div', { style: css('font-size:13px;font-weight:500;line-height:1.4') }, e.title),
            h('div', { style: css('font-size:11px;color:var(--erd-color-text-tertiary);margin-top:2px') }, e.place)))),
        h('div', { style: css('font-size:13px;font-weight:600;margin:16px 0 8px') }, 'Tasks · ' + V.openTaskCount + ' open'),
        V.taskList.map((t, i) => h('div', { key: i, className: 'erd-navrow', onClick: t.onToggle, style: css('display:flex;align-items:center;gap:10px;padding:7px 6px;border-radius:7px;cursor:pointer') },
          h('div', { style: t.boxStyle }, Icon({ icon: 'ant-design:check-outlined', style: t.checkStyle })),
          h('span', { style: t.textStyle }, t.text)))),
      h('div', { style: css('grid-area:fav;background:#fff;border:1px solid var(--erd-color-border-secondary);border-radius:10px;box-shadow:0 1px 2px rgba(0,0,0,.03);padding:16px 18px') },
        h('div', { style: css('display:flex;align-items:center;justify-content:space-between;margin-bottom:12px') },
          h('div', { style: css('font-size:15px;font-weight:600') }, 'Quick launch'),
          h('span', { onClick: V.goBrowse, style: css('font-size:12px;color:var(--erd-color-primary);cursor:pointer;font-weight:500') }, 'Browse all apps')),
        h('div', { style: css('display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px') },
          V.favList.map((f) => h('div', { key: f.id, className: 'erd-tile', onClick: f.onOpen, style: css('display:flex;align-items:center;gap:10px;padding:12px;border:1px solid var(--erd-color-border-secondary);border-radius:9px;cursor:pointer;background:#fff;transition:all .15s') },
            h('div', { style: css('width:34px;height:34px;border-radius:8px;background:var(--erd-color-primary-bg);color:var(--erd-color-primary);display:flex;align-items:center;justify-content:center;font-size:17px;flex:none') }, Icon(f.icon)),
            h('span', { style: css('font-size:12.5px;font-weight:500;line-height:1.3') }, f.name))),
          h('div', { className: 'erd-tile', onClick: V.goBrowse, style: css('display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;border:1px dashed var(--erd-color-border);border-radius:9px;cursor:pointer;color:var(--erd-color-text-tertiary);font-size:12.5px;transition:all .15s') }, Icon('ant-design:appstore-add-outlined', 'font-size:16px'), 'Add app'))))
  )
}

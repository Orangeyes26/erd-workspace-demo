import { createElement as h } from 'react'
import { css } from '../lib/css'
import { EChart } from '../lib/EChart'

/* The "generated" Cowork artifact — authored as real output would be:
   utility-class-style cards + raw ECharts (no design-system chart wrappers). */

const GRID = '#f0f0f0', AXIS = '#bfbfbf', LABEL = '#8c8c8c'
const baseAxis = {
  axisLine: { lineStyle: { color: AXIS } },
  axisTick: { lineStyle: { color: AXIS } },
  axisLabel: { color: LABEL, fontSize: 11, fontFamily: 'ui-monospace, Menlo, monospace' },
  splitLine: { lineStyle: { color: GRID } },
  nameTextStyle: { color: LABEL, fontSize: 11 },
}
const MONO = "ui-monospace, SFMono-Regular, 'IBM Plex Mono', Menlo, monospace"

function spcOption() {
  const labels = []; for (let i = 95; i <= 118; i++) labels.push(String(i))
  const values = [0.419, 0.423, 0.420, 0.418, 0.425, 0.421, 0.417, 0.424, 0.422, 0.420, 0.419, 0.426, 0.421, 0.418, 0.452, 0.423, 0.420, 0.419, 0.422, 0.421, 0.417, 0.424, 0.420, 0.421]
  const cl = 0.421, ucl = 0.454, lcl = 0.388, usl = 0.45, lsl = 0.39
  const data = values.map((v) => ({ value: v, itemStyle: { color: (v > usl || v > ucl || v < lcl) ? '#ff4d4f' : '#1677ff' }, symbolSize: (v > usl || v > ucl || v < lcl) ? 10 : 6 }))
  const ml = (y, color, text, type) => ({ yAxis: y, lineStyle: { color, type: type || 'solid', width: 1 }, label: { formatter: text, color, fontSize: 10, position: 'end' } })
  return {
    animationDuration: 500, grid: { left: 52, right: 64, top: 14, bottom: 30 },
    tooltip: { trigger: 'axis', backgroundColor: '#141414', borderWidth: 0, textStyle: { color: '#fff', fontFamily: 'ui-monospace, monospace', fontSize: 12 } },
    xAxis: { type: 'category', data: labels, name: 'lot', nameLocation: 'middle', nameGap: 24, boundaryGap: false, ...baseAxis },
    yAxis: { type: 'value', min: 0.38, max: 0.46, name: 'Vt (V)', ...baseAxis },
    series: [{ type: 'line', data, lineStyle: { color: '#1677ff', width: 2 }, markLine: { symbol: 'none', silent: true, data: [ml(cl, '#52c41a', 'CL 0.421'), ml(ucl, '#ff4d4f', 'UCL 0.454', 'dashed'), ml(lcl, '#ff4d4f', 'LCL 0.388', 'dashed'), ml(usl, '#faad14', 'USL 0.45', 'dotted'), ml(lsl, '#faad14', 'LSL 0.39', 'dotted')] } }],
  }
}

function histOption() {
  const vals = [0.412, 0.415, 0.416, 0.417, 0.417, 0.418, 0.418, 0.419, 0.419, 0.419, 0.420, 0.420, 0.420, 0.420, 0.421, 0.421, 0.421, 0.421, 0.422, 0.422, 0.422, 0.423, 0.423, 0.424, 0.424, 0.425, 0.426, 0.427, 0.428, 0.430, 0.418, 0.421, 0.420, 0.422, 0.419]
  const min = 0.410, max = 0.432, nb = 11, w = (max - min) / nb
  const bins = new Array(nb).fill(0), cats = []
  for (let i = 0; i < nb; i++) cats.push((min + i * w + w / 2).toFixed(3))
  vals.forEach((v) => { const idx = Math.min(nb - 1, Math.max(0, Math.floor((v - min) / w))); bins[idx]++ })
  return {
    animationDuration: 500, grid: { left: 34, right: 14, top: 14, bottom: 30 }, tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: cats, name: 'Vt (V)', nameLocation: 'middle', nameGap: 24, ...baseAxis },
    yAxis: { type: 'value', ...baseAxis },
    series: [{ type: 'bar', data: bins, barWidth: '92%', itemStyle: { color: '#1677ff', borderRadius: [2, 2, 0, 0] } }],
  }
}

function paretoOption() {
  const cats = ['Scratch', 'Residue', 'Open', 'Bridge', 'Particle']; const data = [4, 9, 18, 31, 42]
  return {
    animationDuration: 500, grid: { left: 66, right: 34, top: 8, bottom: 24 }, tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: { type: 'value', ...baseAxis }, yAxis: { type: 'category', data: cats, ...baseAxis },
    series: [{ type: 'bar', data, barWidth: '60%', itemStyle: { color: '#1677ff', borderRadius: [0, 3, 3, 0] }, label: { show: true, position: 'right', color: '#8c8c8c', fontSize: 11, fontFamily: 'ui-monospace, monospace' } }],
  }
}

function Kpi({ label, value, unit, delta, tone }) {
  const valColor = tone === 'pass' ? '#16a34a' : tone === 'warn' ? '#f59e0b' : '#1f2937'
  const deltaColor = tone === 'warn' ? '#f59e0b' : tone === 'pass' ? '#16a34a' : '#9ca3af'
  return h('div', { style: css('background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:16px;box-shadow:0 1px 2px 0 rgba(0,0,0,0.05)') },
    h('div', { style: css('font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af') }, label),
    h('div', { style: { marginTop: 6, fontSize: 30, fontWeight: 700, lineHeight: 1, color: valColor, fontFamily: MONO } }, value, unit ? h('span', { style: css('font-size:16px;font-weight:500;color:#9ca3af;margin-left:2px') }, unit) : null),
    delta ? h('div', { style: { marginTop: 8, fontSize: 12, color: deltaColor, fontFamily: MONO } }, delta) : null)
}

function Panel({ title, children }) {
  return h('div', { style: css('background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:16px;box-shadow:0 1px 2px 0 rgba(0,0,0,0.05)') },
    h('div', { style: css('font-size:14px;font-weight:600;color:#1f2937;margin-bottom:8px') }, title), children)
}

export function SPCDashboard() {
  return h('div', { style: css('display:flex;flex-direction:column;gap:16px') },
    h('div', { style: { display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' } },
      h(Kpi, { label: 'Cpk (Vt)', value: '1.34', delta: '▲ within spec', tone: 'pass' }),
      h(Kpi, { label: 'Mean (μ)', value: '0.421', unit: 'V', tone: 'neutral' }),
      h(Kpi, { label: 'Sigma (σ)', value: '0.011', unit: 'V', tone: 'neutral' }),
      h(Kpi, { label: 'Out of control', value: '1', delta: '▼ lot 109', tone: 'warn' })),
    h(Panel, { title: 'Control chart — Vt individuals' }, h(EChart, { option: spcOption(), height: 320 })),
    h('div', { style: { display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' } },
      h(Panel, { title: 'Vt distribution' }, h(EChart, { option: histOption(), height: 240 })),
      h(Panel, { title: 'Defect pareto' }, h(EChart, { option: paretoOption(), height: 240 })))
  )
}

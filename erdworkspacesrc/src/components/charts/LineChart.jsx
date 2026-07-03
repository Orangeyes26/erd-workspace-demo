import { createElement as h, useMemo } from 'react'
import { EChart } from '../../lib/EChart'

function buildLineOption(series, xData, markLines, area, yName) {
  const ml = markLines && markLines.length ? {
    markLine: {
      silent: true, symbol: 'none',
      data: markLines.map((m) => ({
        yAxis: m.y,
        lineStyle: { color: m.color || '#8c8c8c', type: m.type || 'dashed', width: 1.5 },
        label: { formatter: m.label || '', position: 'insideEndTop', fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: m.color },
      })),
    },
  } : {}
  return {
    animationDuration: 500,
    grid: { left: 8, right: 16, top: 34, bottom: 8, containLabel: true },
    legend: { top: 0, left: 0 },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', boundaryGap: false, data: xData, name: '', nameLocation: 'middle', nameGap: 26 },
    yAxis: { type: 'value', name: yName || '', scale: true },
    series: (series || []).map((s, i) => ({
      name: s.name, type: 'line', smooth: false,
      showSymbol: xData.length <= 40, data: s.data,
      lineStyle: s.color ? { color: s.color } : undefined,
      itemStyle: s.color ? { color: s.color } : undefined,
      areaStyle: area ? { opacity: 0.12 } : undefined,
      ...(i === 0 ? ml : {}),
    })),
  }
}

/* eRD Charting · LineChart */
export function LineChart({ series, xData, markLines, yName, area, height = 280 }) {
  const option = useMemo(() => buildLineOption(series, xData, markLines, area, yName), [series, xData, markLines, area, yName])
  return h(EChart, { option, height, theme: 'erd' })
}

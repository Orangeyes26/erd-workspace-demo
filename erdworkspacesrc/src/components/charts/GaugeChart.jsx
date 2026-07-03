import { createElement as h, useMemo } from 'react'
import { EChart } from '../../lib/EChart'

function buildGaugeOption({ value, min = 0, max = 100, label = '', unit = '', precision = 0, zones }) {
  return {
    series: [{
      type: 'gauge', min, max, startAngle: 210, endAngle: -30, radius: '92%',
      progress: { show: false },
      axisLine: { lineStyle: { width: 14, color: zones || [[0.6, '#ff4d4f'], [0.85, '#faad14'], [1, '#52c41a']] } },
      pointer: { width: 4, length: '62%', itemStyle: { color: '#141414' } },
      anchor: { show: true, size: 10, itemStyle: { color: '#141414' } },
      axisTick: { distance: -18, length: 5, lineStyle: { color: '#8c8c8c' } },
      splitLine: { distance: -18, length: 12, lineStyle: { color: '#8c8c8c' } },
      axisLabel: { distance: 18, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: '#63707f' },
      title: { offsetCenter: [0, '26%'], fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: '#63707f' },
      detail: { valueAnimation: true, offsetCenter: [0, '-2%'], fontFamily: "'IBM Plex Mono', monospace", fontSize: 30, fontWeight: 700, color: '#141414', formatter: (v) => v.toFixed(precision) + unit },
      data: [{ value, name: label }],
    }],
  }
}

/* eRD Charting · GaugeChart */
export function GaugeChart(props) {
  const option = useMemo(() => buildGaugeOption(props), [props.value, props.min, props.max, props.label, props.unit, props.precision])
  return h(EChart, { option, height: props.height || 240 })
}

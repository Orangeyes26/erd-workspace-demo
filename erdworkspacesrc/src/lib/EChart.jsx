import { createElement as h, useRef, useEffect } from 'react'
import * as echarts from 'echarts'

let _themeReg = false
export function ensureErdTheme() {
  if (_themeReg) return
  const grid = '#f0f0f0', axis = '#d9d9d9', axisLabel = 'rgba(0,0,0,0.45)', title = 'rgba(0,0,0,0.88)'
  const sans = "'IBM Plex Sans', sans-serif", mono = "'IBM Plex Mono', monospace"
  const axisCommon = {
    axisLine: { lineStyle: { color: axis } },
    axisTick: { lineStyle: { color: axis }, length: 4 },
    axisLabel: { color: axisLabel, fontFamily: mono, fontSize: 11 },
    splitLine: { lineStyle: { color: grid, type: 'solid' } },
    nameTextStyle: { color: axisLabel, fontFamily: sans, fontSize: 11 },
  }
  echarts.registerTheme('erd', {
    color: ['#5b8ff9', '#61ddaa', '#65789b', '#f6bd16', '#7262fd', '#78d3f8', '#9661bc', '#f6903d', '#008685'],
    backgroundColor: 'transparent',
    textStyle: { fontFamily: sans, fontSize: 12, color: axisLabel },
    title: { textStyle: { color: title, fontFamily: sans, fontWeight: 600, fontSize: 14 } },
    categoryAxis: axisCommon, valueAxis: axisCommon, logAxis: axisCommon, timeAxis: axisCommon,
    legend: { textStyle: { color: axisLabel, fontFamily: sans, fontSize: 12 }, icon: 'roundRect', itemWidth: 12, itemHeight: 8 },
    tooltip: { backgroundColor: 'rgba(0,0,0,0.85)', borderWidth: 0, padding: [8, 10], textStyle: { color: '#fff', fontFamily: mono, fontSize: 12 } },
    line: { symbol: 'circle', symbolSize: 5, lineStyle: { width: 2 }, smooth: false },
    bar: { itemStyle: { borderRadius: [2, 2, 0, 0] } },
  })
  _themeReg = true
}

export function EChart({ option, height, theme }) {
  const ref = useRef(null)
  const inst = useRef(null)
  useEffect(() => {
    if (!ref.current) return undefined
    if (theme === 'erd') ensureErdTheme()
    const chart = echarts.init(ref.current, theme === 'erd' ? 'erd' : null)
    inst.current = chart
    chart.setOption(option)
    const ro = new ResizeObserver(() => chart.resize())
    ro.observe(ref.current)
    return () => { ro.disconnect(); chart.dispose(); inst.current = null }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => { if (inst.current) inst.current.setOption(option, true) }, [option])
  return h('div', { ref, style: { width: '100%', height: height || 280 } })
}

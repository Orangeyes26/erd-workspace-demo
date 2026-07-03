import { createElement as h, useState, useRef, useEffect } from 'react'
import { css } from '../../lib/css'
import { Icon } from '../../lib/Icon'

/* eRD AI Chat · Sender (composer) */
export function Sender({ value, placeholder, loading = false, disabled = false, allowSpeech = false, onChange, onSubmit, onCancel }) {
  const [focused, setFocused] = useState(false)
  const taRef = useRef(null)
  const val = value || ''
  useEffect(() => {
    const ta = taRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px'
  }, [val])
  const submit = () => {
    if (loading || disabled) return
    const v = (val || '').trim()
    if (!v) return
    onSubmit && onSubmit(v)
  }
  return h('div', { style: css('display:flex;align-items:flex-end;gap:8px;padding:8px 8px 8px 14px;background:var(--erd-color-bg-container);border:1px solid ' + (focused ? 'var(--erd-color-primary)' : 'var(--erd-color-border)') + ';border-radius:var(--erd-radius-xl);box-shadow:var(--erd-shadow-composer);transition:border-color .15s') },
    h('textarea', {
      ref: taRef, value: val, placeholder: placeholder || 'Ask eRD anything…', rows: 1,
      onFocus: () => setFocused(true), onBlur: () => setFocused(false),
      onChange: (e) => onChange && onChange(e.target.value),
      onKeyDown: (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } },
      style: css('flex:1;border:none;outline:none;resize:none;font-family:inherit;font-size:14px;line-height:1.5;color:var(--erd-color-text);max-height:160px;padding:6px 0;background:transparent'),
    }),
    allowSpeech ? h('div', { className: 'erd-icon-btn', style: css('width:34px;height:34px;display:flex;align-items:center;justify-content:center;border-radius:9px;cursor:pointer;color:var(--erd-color-text-tertiary);font-size:17px;flex:none') }, Icon('ant-design:audio-outlined')) : null,
    loading
      ? h('div', { className: 'erd-icon-btn', onClick: () => onCancel && onCancel(), title: 'Stop', style: css('width:36px;height:36px;border-radius:10px;background:var(--erd-color-fill-secondary);color:var(--erd-color-text-secondary);display:flex;align-items:center;justify-content:center;cursor:pointer;flex:none') }, Icon('ant-design:pause-outlined', 'font-size:16px'))
      : h('div', { onClick: submit, title: 'Send', style: css('width:36px;height:36px;border-radius:10px;background:' + ((val || '').trim() ? 'var(--erd-color-primary)' : 'var(--erd-color-fill)') + ';color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;flex:none;transition:background .15s') }, Icon('ant-design:arrow-up-outlined', 'font-size:17px')))
}

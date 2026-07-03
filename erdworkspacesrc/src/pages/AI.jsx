import { createElement as h } from 'react'
import { css } from '../lib/css'
import { Icon } from '../lib/Icon'
import { StarIcon } from '../components/brandIcons'
import { useWorkspace } from '../state/WorkspaceContext'
import { Welcome } from '../components/ai/Welcome'
import { Prompts } from '../components/ai/Prompts'
import { Bubble } from '../components/ai/Bubble'
import { Sender } from '../components/ai/Sender'

export function AI() {
  const V = useWorkspace()
  return h('div', { style: css('height:100%;display:flex;flex-direction:column;background:#fff') },
    h('div', { style: css('height:52px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 22px;border-bottom:1px solid var(--erd-color-border-secondary)') },
      h('div', { style: css('display:flex;align-items:center;gap:9px;font-weight:600;font-size:15px') }, h(StarIcon, { size: 20, fill: 'var(--erd-color-primary)' }), 'eRD AI'),
      h('div', { className: 'erd-icon-btn', onClick: V.newChat, style: css('display:flex;align-items:center;gap:7px;height:32px;padding:0 12px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--erd-color-text-secondary);border:1px solid var(--erd-color-border)') }, Icon('ant-design:plus-outlined'), 'New chat')),
    h('div', { style: css('flex:1;overflow-y:auto;min-height:0') },
      V.aiEmpty ? h('div', { style: css('max-width:760px;margin:0 auto;padding:40px 24px') },
        h(Welcome, { icon: V.robotIcon, title: 'eRD Assistant', description: 'Your R&D copilot for process integration, device physics, TCAD, and inline analysis. Answers cite internal specs and lab data — always verify against the PDK.' }),
        h('div', { style: { height: '22px' } }),
        h(Prompts, { title: 'Start with a task', items: V.aiPrompts, onItemClick: V.pickPrompt })) : null,
      V.aiHasMessages ? h('div', { style: css('max-width:760px;margin:0 auto;padding:26px 24px;display:flex;flex-direction:column;gap:20px') },
        V.aiMsgs.map((m, i) => h(Bubble, { key: i, placement: m.placement, avatar: m.avatar, header: m.header, content: m.content })),
        V.aiStreaming ? h(Bubble, { placement: 'start', avatar: V.robotAvatar, header: 'eRD Assistant', loading: true }) : null) : null),
    h('div', { style: css('flex:none;padding:14px 24px 18px;border-top:1px solid var(--erd-color-border-secondary)') },
      h('div', { style: css('max-width:760px;margin:0 auto') },
        h(Sender, { value: V.aiInput, placeholder: 'Ask about DIBL, TCAD logs, inline pareto, SPICE extraction…', loading: V.aiStreaming, allowSpeech: true, onChange: V.onAiChange, onSubmit: V.onAiSubmit, onCancel: V.onAiCancel }),
        h('div', { style: css('text-align:center;font-size:11px;color:var(--erd-color-text-tertiary);margin-top:8px') }, 'eRD can make mistakes. Verify device data against the PDK and lab records.')))
  )
}

/* Parse a CSS text string ("a:b;c:d") into a React style object.
   Lets the prototype's inline-style strings port over near-verbatim. */
export function css(str) {
  if (str && typeof str === 'object') return str
  const o = {}
  String(str || '').split(';').forEach((part) => {
    const s = part.trim()
    if (!s) return
    const i = s.indexOf(':')
    if (i < 0) return
    let k = s.slice(0, i).trim()
    const v = s.slice(i + 1).trim()
    k = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    o[k] = v
  })
  return o
}

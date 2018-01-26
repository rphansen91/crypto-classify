import safeFloat from '../utils/safeFloat'

export default function (num) {
  const n = safeFloat(num)

  if (!n || typeof n !== 'number') return '0'
  if (n === 1) return '1'
  return n.toFixed(8)
}

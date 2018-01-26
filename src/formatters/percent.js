import isPositive from '../utils/isPositive'

const round = num => Math.round(num * 100) / 100
const formatNum = num => Math.abs(round(num))

export default isPositive(
  v => `(+${formatNum(v)}%)`,
  v => `(-${formatNum(v)}%)`
)

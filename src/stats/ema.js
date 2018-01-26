import ma from './ma'

export default function (size, arr) {
  const sma = ma(size, arr)
  const mul = 2 / (size + 1)
  return sma.reduce(function (acc, curr, i) {
    if (curr && acc[i - 1]) {
      const price = arr[i]
      const ema_prev = acc[i - 1]
      const ema_next = (price - ema_prev) * mul + ema_prev
      return acc.concat(ema_next)
    }
    return acc.concat(curr)
  }, [])
}

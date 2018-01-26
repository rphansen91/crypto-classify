export default function (size, cb, arr) {
  return arr.reduce(function (acc, c, i) {
    if ((i + 1) >= size) {
      acc.push(cb(arr.slice(i + 1 - size, i + 1)))
    } else {
      acc.push(null)
    }
    return acc
  }, [])
}

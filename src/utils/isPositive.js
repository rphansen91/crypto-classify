export default function (posCb, negCb) {
  return function (val) {
    if (val >= 0) return posCb(val)
    return negCb(val)
  }
}

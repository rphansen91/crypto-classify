function add (a, b) {
  return a + b
}

export default function (arr) {
  return arr.reduce(add, 0)
}

export default function (n) {
  return parseFloat(
    (n + '')
    .replace(/\,/g, '')
  )
}

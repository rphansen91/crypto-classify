export default function (cb) {
  window.onscroll = function scrollHandler () {
    cb({ x: window.scrollX, y: window.scrollY })
  }

  return function () {}
}

export function scrollTo (x, y) {
  window.scrollTo(x, y)
}

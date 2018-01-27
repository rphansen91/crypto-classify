export default function (cb) {
  window.onscroll = function scrollHandler () {
    cb({ x: window.scrollX, y: window.scrollY })
  }

  // window.addEventListener('scroll', handler)

  return function () {
    // window.removeEventListener('scroll', handler)
  }
}

export function scrollToElement(event: Event) {
  event.preventDefault()

  const anchor =
    event.target instanceof HTMLAnchorElement
      ? event.target
      : event.target instanceof HTMLSpanElement
      ? event.target.parentElement
      : null

  if (!anchor || !(anchor instanceof HTMLAnchorElement)) {
    return
  }

  const { hash } = anchor

  if (!hash) {
    return
  }

  const element = document.getElementById(hash.slice(1))
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    window.history.pushState({}, '', hash)
  }
}

import { createSignal, onCleanup } from 'solid-js'

export function createIsVisibleSignal() {
  const [getIsVisible, setIsVisible] = createSignal(false)
  const [getRef, setRef] = createSignal<HTMLDivElement | undefined>(undefined)

  function onScroll() {
    const ref = getRef()
    if (ref instanceof HTMLDivElement) {
      const screenHeight = window.innerHeight
      const bottomOfRef = ref.getBoundingClientRect().bottom

      if (bottomOfRef < screenHeight) {
        setIsVisible(true)
      }
    }
  }

  document.addEventListener('scroll', onScroll)

  onCleanup(() => document.removeEventListener('scroll', onScroll))

  return [getIsVisible, setRef] as const
}

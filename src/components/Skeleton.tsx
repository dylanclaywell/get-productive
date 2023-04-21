import { createSignal } from 'solid-js'

export function Skeleton() {
  const [getIsVisible, setIsVisible] = createSignal(false)
  let ref: HTMLDivElement | ((el: HTMLDivElement) => void) | undefined

  document.addEventListener('scroll', (event: Event) => {
    if (ref instanceof HTMLDivElement) {
      const screenHeight = window.innerHeight
      const bottomOfRef = ref.getBoundingClientRect().bottom

      if (bottomOfRef < screenHeight) {
        setIsVisible(true)
      }
    }
  })

  return (
    <div ref={ref} class="space-y-4">
      <div class="space-y-3">
        <div
          class="w-full h-4 bg-gray-300 rounded-sm opacity-30"
          classList={{
            'grow-left': getIsVisible(),
          }}
        ></div>
        <div
          class="w-11/12 h-4 bg-gray-300 rounded-sm opacity-30"
          classList={{
            'grow-left': getIsVisible(),
          }}
        ></div>
        <div
          class="w-1/2 h-4 bg-gray-300 rounded-sm opacity-30"
          classList={{
            'grow-left': getIsVisible(),
          }}
        ></div>
      </div>
      <div class="space-y-3">
        <div
          class="w-1/4 h-4 bg-gray-300 rounded-sm opacity-30"
          classList={{
            'grow-left': getIsVisible(),
          }}
        ></div>
        <div
          class="w-full h-4 bg-gray-300 rounded-sm opacity-30"
          classList={{
            'grow-left': getIsVisible(),
          }}
        ></div>
        <div
          class="w-2/3 h-4 bg-gray-300 rounded-sm opacity-30"
          classList={{
            'grow-left': getIsVisible(),
          }}
        ></div>
      </div>
    </div>
  )
}

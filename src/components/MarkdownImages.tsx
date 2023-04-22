import { JSXElement } from 'solid-js'
import { createIsVisibleSignal } from '../signals/createIsVisibleSignal'

export function MarkdownImages(): JSXElement {
  const [getIsVisible, setRef] = createIsVisibleSignal()

  return (
    <div
      ref={setRef}
      class="space-y-8 flex flex-col items-center justify-center w-full"
    >
      <img
        class="shadow-md rounded-md"
        classList={{
          'animate-slide-up-1': getIsVisible(),
        }}
        src="src/assets/before.svg"
      />
      <img
        class="drop-shadow-md"
        classList={{
          'animate-slide-up-2': getIsVisible(),
        }}
        src="src/assets/arrow.svg"
      />
      <img
        class="shadow-md rounded-md"
        classList={{
          'animate-slide-up-3': getIsVisible(),
        }}
        src="src/assets/after.svg"
      />
    </div>
  )
}

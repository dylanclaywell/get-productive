import { JSXElement } from 'solid-js'
import { createIsVisibleSignal } from '../signals/createIsVisibleSignal'

import before from '../assets/before.svg'
import after from '../assets/after.svg'
import arrow from '../assets/arrow.svg'

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
        src={before}
        alt="Screenshot of a Markdown editor before converting to rendered Markdown"
      />
      <img
        class="drop-shadow-md"
        classList={{
          'animate-slide-up-2': getIsVisible(),
        }}
        src={arrow}
        alt="Arrow pointing to a screenshot of a Markdown editor after converting to rendered Markdown"
      />
      <img
        class="shadow-md rounded-md"
        classList={{
          'animate-slide-up-3': getIsVisible(),
        }}
        src={after}
        alt="Screenshot of a Markdown editor after converting to rendered Markdown"
      />
    </div>
  )
}

import type { JSXElement } from 'solid-js'

import { Emphasis } from './components/Emphasis'
import { GetTasking } from './components/GetTasking'
import { GetNoting } from './components/GetNoting'

export function App(): JSXElement {
  return (
    <>
      <nav class="flex justify-between p-4 items-center">
        <h1 class="text-heading-2 whitespace-nowrap">
          get <Emphasis color="cyan">productive</Emphasis>
        </h1>
        <ul class="flex space-x-4">
          <li class="whitespace-nowrap">
            <a href="/">Home</a>
          </li>
          <li class="whitespace-nowrap">
            <a href="#get-tasking">
              get <Emphasis color="cyan">tasking</Emphasis>
            </a>
          </li>
          <li class="whitespace-nowrap">
            <a href="#get-noting">
              get <Emphasis color="magenta">noting</Emphasis>
            </a>
          </li>
        </ul>
      </nav>
      <main>
        <section class="flex flex-col items-center w-full space-y-6 py-64">
          <h2 class="text-heading-1 text-gray-500">
            It's time to get productive
          </h2>
          <p class="text-gray-500">
            Development tools by a dev, for devs (or at least one dev)
          </p>
        </section>
        <GetTasking />
        <GetNoting />
      </main>
    </>
  )
}

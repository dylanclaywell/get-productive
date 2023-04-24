import type { JSXElement } from 'solid-js'

import { Nav } from './components/Nav'
import { GetTasking } from './components/GetTasking'
import { GetJotting } from './components/GetJotting'
import { Footer } from './components/Footer'

export function App(): JSXElement {
  return (
    <>
      <Nav />
      <main>
        <section class="flex flex-col items-center text-center w-full space-y-6 px-4 py-64">
          <h2 class="text-heading-1 text-gray-500 animate-fade-in">
            It's time to get productive
          </h2>
          <p class="text-gray-500 animate-fade-in-delayed">
            Development tools by a dev, for devs (or at least one dev)
          </p>
        </section>
        <GetTasking />
        <GetJotting />
        <Footer />
      </main>
    </>
  )
}

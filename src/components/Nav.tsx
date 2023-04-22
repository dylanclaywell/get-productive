import { JSXElement } from 'solid-js'

import { Emphasis } from './Emphasis'

export function Nav(): JSXElement {
  return (
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
          <a href="#get-jotting">
            get <Emphasis color="magenta">jotting</Emphasis>
          </a>
        </li>
      </ul>
    </nav>
  )
}

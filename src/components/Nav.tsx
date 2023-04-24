import { JSXElement } from 'solid-js'

import { Emphasis } from './Emphasis'
import { scrollToElement } from '../scrollToElement'

function Link(props: {
  href: string
  color: 'cyan' | 'magenta'
  children: JSXElement
}): JSXElement {
  return (
    <li
      class="whitespace-nowrap border-b-2 border-b-transparent"
      classList={{
        'hover:border-b-cyan': props.color === 'cyan',
        'hover:border-b-magenta': props.color === 'magenta',
      }}
      onClick={scrollToElement}
    >
      <a href={props.href}>{props.children}</a>
    </li>
  )
}

export function Nav(): JSXElement {
  return (
    <nav class="flex flex-col lg:flex-row justify-between p-4 items-center">
      <h1 class="text-heading-2 whitespace-nowrap">
        get <Emphasis color="cyan">productive</Emphasis>
      </h1>
      <ul class="flex justify-center flex-wrap lg:flex-nowrap lg:justify-normal space-x-4">
        <Link color="cyan" href="/">
          Home
        </Link>
        <Link color="cyan" href="#get-tasking">
          get <Emphasis color="cyan">tasking</Emphasis>
        </Link>
        <Link color="magenta" href="#get-jotting">
          get <Emphasis color="magenta">jotting</Emphasis>
        </Link>
      </ul>
    </nav>
  )
}

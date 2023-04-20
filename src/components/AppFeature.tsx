import type { JSXElement } from 'solid-js'

import { Emphasis } from './Emphasis'
import { Feature } from './Feature'

export interface Props {
  iconSrc: string
  title: string
  color: 'cyan' | 'magenta'
  backgroundSrc: string
  imageSrc: string
  flip?: boolean
  children?: JSXElement
}

export function AppFeature(props: Props): JSXElement {
  return (
    <Feature
      flip={props.flip}
      class="z-10 relative overflow-hidden"
      left={
        <>
          <img
            class="pt-40 absolute left-0 top-0 w-full scale-125 pointer-events-none feature__background"
            aria-hidden
            src={props.backgroundSrc}
          />
          <div class="flex flex-nowrap items-center space-x-4 py-8">
            <img src={props.iconSrc} />
            <h3 class="text-heading-3 whitespace-nowrap">
              get <Emphasis color="cyan">{props.title}</Emphasis>
            </h3>
          </div>
          {props.children}
        </>
      }
      right={<img class="z-10" src={props.imageSrc} />}
    />
  )
}

import type { JSXElement } from 'solid-js'

import { Emphasis } from './Emphasis'
import { Feature } from './Feature'

export interface Props {
  id?: string
  iconSrc: string
  iconAlt: string
  title: string
  color: 'cyan' | 'magenta'
  backgroundSrc: string
  imageSrc: string
  appImageAlt: string
  flip?: boolean
  flipOnMobile?: boolean
  children?: JSXElement
}

export function AppFeature(props: Props): JSXElement {
  return (
    <Feature
      id={props.id}
      flip={props.flip}
      flipOnMobile={props.flipOnMobile}
      class="z-10 relative overflow-hidden"
      left={
        <>
          <img
            class="absolute left-0 top-0 w-full pointer-events-none object-cover object-top h-full"
            aria-hidden
            src={props.backgroundSrc}
            alt="Background image"
          />
          <div class="flex flex-nowrap items-center space-x-4 py-8">
            <img src={props.iconSrc} alt={props.iconAlt} />
            <h3 class="text-heading-3 whitespace-nowrap">
              get <Emphasis color={props.color}>{props.title}</Emphasis>
            </h3>
          </div>
          {props.children}
        </>
      }
      right={<img class="z-10" src={props.imageSrc} alt={props.appImageAlt} />}
    />
  )
}

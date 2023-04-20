import type { JSXElement } from 'solid-js'
import { Emphasis } from './Emphasis'
import { Feature } from './Feature'

export interface Props {
  iconSrc: string
  title: string
  imageSrc: string
  children?: JSXElement
}

export function AppFeature(props: Props): JSXElement {
  return (
    <Feature
      left={
        <>
          <div class="flex flex-nowrap items-center space-x-4 py-8">
            <img src={props.iconSrc} />
            <h3 class="text-heading-3">
              get <Emphasis color="cyan">{props.title}</Emphasis>
            </h3>
          </div>
          {props.children}
        </>
      }
      right={<img src={props.imageSrc} />}
    />
  )
}

import { JSX } from 'solid-js'

export interface Props {
  children: JSX.Element
}

export default function MenuItem(props: Props) {
  return <div>{props.children}</div>
}

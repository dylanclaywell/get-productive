import { JSX } from 'solid-js'

export interface Props {
  children: JSX.Element
}

export default function MenuItem(props: Props) {
  return <div className="p-4">{props.children}</div>
}

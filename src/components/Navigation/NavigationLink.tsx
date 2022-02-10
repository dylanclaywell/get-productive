import { Link } from 'solid-app-router'

export interface Props {
  href: string
  label: string
}

export default function NavigationLink(props: Props) {
  return (
    <Link href={props.href}>
      <div className="transition-all p-4 text-lg hover:bg-cyan-700 tracking-widest">
        {props.label}
      </div>
    </Link>
  )
}

import classNames from 'classnames'
import { Link } from 'solid-app-router'

import styles from './Button.module.css'

type ButtonProps = {
  onClick?: () => void
}

type LinkProps = {
  href: string
}

type BaseProps = {
  classes?: string
  variant: 'blue' | 'pink'
  label: string
  isActive?: boolean
}

export type Props = BaseProps & (ButtonProps | LinkProps)

function isLink(props: Props): props is BaseProps & LinkProps {
  return 'href' in props
}

export default function Button(props: Props) {
  const getClasses = () =>
    classNames(
      styles['button'],
      {
        [styles['button--active']]: props.isActive,
        [styles['button--pink']]: props.variant === 'pink',
        [styles['button--blue']]: props.variant === 'blue',
      },
      props.classes
    )

  if (!isLink(props)) {
    return (
      <button class={getClasses()} onClick={props.onClick}>
        {props.label}
      </button>
    )
  }

  return (
    <Link class={getClasses()} href={props.href}>
      {props.label}
    </Link>
  )
}

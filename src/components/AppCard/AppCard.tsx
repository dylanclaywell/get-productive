import classNames from 'classnames'
import { Link } from 'solid-app-router'
import { JSXElement } from 'solid-js'

import styles from './AppCard.module.css'

interface Props {
  icon: JSXElement
  subtitle: JSXElement
  classes?: string
}

export default function AppCard(props: Props) {
  return (
    <Link href="" class={classNames(styles['app-card'], props.classes)}>
      <div class={styles['app-card__icon']}>{props.icon}</div>
      <span class={styles['app-card__subtitle']}>{props.subtitle}</span>
    </Link>
  )
}

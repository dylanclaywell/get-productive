import { Link } from 'solid-app-router'

import styles from './Header.module.css'

export default function Header() {
  return (
    <header class={styles['header']}>
      <Link class={styles['header__logo']} href="/">
        get <span class={styles['header__logo--color']}>PRODUCTIVE</span>
      </Link>
      <nav class={styles['header__nav']}>
        <Link href="/" class={styles['header__nav-link']}>
          Home
        </Link>
        <Link
          href="/downloads?app=get-noting"
          class={styles['header__nav-link']}
        >
          Downloads
        </Link>
      </nav>
    </header>
  )
}

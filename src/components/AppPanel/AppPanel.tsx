import { useTheme } from '../../contexts/Theme'
import { useUser } from '../../contexts/User'
import MenuItem from '../MenuItem'
import type { AppContext } from '../../pages/main'

import styles from './AppPanel.module.css'

export interface Props {
  setAppContext: (name: AppContext) => void
}

export default function AppPanel(props: Props) {
  const [, { logout }] = useUser()
  const [getThemeState] = useTheme()

  return (
    <div
      classList={{
        [styles['app-panel-dark']]: getThemeState().theme === 'dark',
      }}
      className={styles['app-panel']}
    >
      <div>
        <MenuItem
          icon="fa-solid fa-check"
          isRounded={false}
          onClick={() => props.setAppContext('todo')}
        >
          Todo
        </MenuItem>
        <MenuItem
          icon="fa-solid fa-gear"
          isRounded={false}
          onClick={() => props.setAppContext('settings')}
        >
          Settings
        </MenuItem>
      </div>
      <div>
        <MenuItem
          icon="fa-solid fa-arrow-right-from-bracket"
          isRounded={false}
          onClick={logout}
        >
          Log out
        </MenuItem>
      </div>
    </div>
  )
}

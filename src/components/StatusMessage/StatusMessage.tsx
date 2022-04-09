import { createSignal } from 'solid-js'

import IconButton from '../IconButton'
import { MessageType } from '../../contexts/Message'

import styles from './StatusMessage.module.css'

interface Props {
  type: MessageType
  message: string
  onClose: () => void
}

export default function StatusMessage(props: Props) {
  const [getIsExiting, setIsExiting] = createSignal(false)

  const onClick = () => {
    setIsExiting(true)
  }

  return (
    <div
      className={styles['status-message']}
      classList={{
        [styles['success']]: props.type === 'success',
        [styles['error']]: props.type === 'error',
        [styles['exiting']]: getIsExiting(),
      }}
      onAnimationEnd={() => {
        if (getIsExiting()) {
          setIsExiting(false)
          props.onClose()
        }
      }}
    >
      <span>{props.message}</span>
      <IconButton icon="fa-solid fa-close" onClick={onClick} />
    </div>
  )
}

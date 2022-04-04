import { format, sub, add } from 'date-fns'

import styles from './DateHeader.module.css'

export interface Props {
  currentDate: Date
  setCurrentDate: (date: Date) => void
}

export default function DateHeader(props: Props) {
  const shiftLeft = () => {
    props.setCurrentDate(sub(props.currentDate, { days: 1 }))
  }

  const shiftRight = () => {
    props.setCurrentDate(add(props.currentDate, { days: 1 }))
  }

  return (
    <div className={styles['date-header']}>
      <button className={styles['date-header-date-button']} onClick={shiftLeft}>
        <i class="fa-solid fa-chevron-left" />
        {format(sub(props.currentDate, { days: 1 }), 'LLLL do')}
      </button>
      <div className={styles['date-header-current-day-container']}>
        <span className={styles['date-header-current-day']}>
          {format(props.currentDate, 'EEEE')}
        </span>
        <h1 className={styles['date-header-current-date']}>
          {format(props.currentDate, 'LLLL do, yyyy')}
        </h1>
      </div>
      <button
        className={styles['date-header-date-button']}
        onClick={shiftRight}
      >
        {format(add(props.currentDate, { days: 1 }), 'LLLL do')}
        <i class="fa-solid fa-chevron-right" />
      </button>
    </div>
  )
}

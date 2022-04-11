import styles from './SkeletonSettings.module.css'
import classnames from 'classnames'

export default function SkeletonSettings() {
  return (
    <div className={styles['container']}>
      <div className={classnames(styles['heading'], styles['skeleton'])} />
      <div className={classnames(styles['text-long'], styles['skeleton'])} />
      <div className={classnames(styles['text-medium'], styles['skeleton'])} />
      <div className={classnames(styles['text-short'], styles['skeleton'])} />
    </div>
  )
}

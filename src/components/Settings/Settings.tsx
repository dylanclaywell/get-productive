import styles from './Settings.module.css'

export default function Settings() {
  const tags = [
    {
      name: 'in progress',
      color: '#b40000',
    },
    {
      name: 'in code review',
      color: '#00b400',
    },
  ]

  return (
    <div className={styles['settings']}>
      <h1 className={styles['settings-heading']}>Settings</h1>
      <h2>Tags</h2>
      <div className={styles['settings-tag-table']}>
        {tags.map((tag) => (
          <div className={styles['settings-tag-table-row']}>
            <div>
              <input
                className={styles['settings-tag-table-input']}
                value={tag.name}
              />
            </div>
            <div className={styles['settings-tag-color']}>
              <div
                className={styles['settings-tag-color-sample']}
                style={{ 'background-color': tag.color }}
              />
              <input
                className={styles['settings-tag-table-input']}
                value={tag.color}
              />
            </div>
          </div>
        ))}
        <div className={styles['settings-tag-table-add-row']}>
          Add row
          <i className="fa-solid fa-plus" />
        </div>
      </div>
    </div>
  )
}
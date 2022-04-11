import { createSignal, createEffect, onCleanup, Show } from 'solid-js'
import classnames from 'classnames'

import Switch from '../Switch'
import TextField from '../TextField'
import Fab from '../Fab'
import { useTheme } from '../../contexts/Theme'

import styles from './AddTodoItemWidget.module.css'

export interface Props {
  addTodoItem: (value: string) => void
  canOpen: boolean
}

export default function AddTodoItemWidget(props: Props) {
  const [getTheme] = useTheme()
  const [getInputRef, setInputRef] = createSignal<HTMLInputElement>()
  const [getInputValue, setInputValue] = createSignal('')
  const [getInputIsOpen, setInputIsOpen] = createSignal(false)
  const [getInputIsExiting, setInputIsExiting] = createSignal(false)
  const [getUseMultipleEntries, setUseMultipleEntries] = createSignal(false)

  const closeAddTodoItemPrompt = () => {
    setInputIsExiting(true)
  }

  const handleKeyDownWhenAddingItem = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && getInputValue() !== '') {
      props.addTodoItem(getInputValue())
      setInputValue('')

      if (!getUseMultipleEntries()) {
        closeAddTodoItemPrompt()
      }
    }

    if (e.key === 'Escape') {
      closeAddTodoItemPrompt()
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'a' && !getInputIsOpen() && props.canOpen) {
      e.preventDefault()
      setInputIsOpen(true)
    }

    if (getInputIsOpen() && !getInputIsExiting()) {
      handleKeyDownWhenAddingItem(e)
    }
  }

  createEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
  })

  createEffect(() => {
    const inputRef = getInputRef()
    if (getInputIsOpen() && inputRef) {
      inputRef.focus()
    }
  })

  onCleanup(() =>
    document.removeEventListener('keydown', handleKeyDownWhenAddingItem)
  )

  return (
    <>
      <Show when={getInputIsOpen()}>
        <>
          <div
            className={classnames(styles['overlay'], {
              [styles['overlay-leave']]: getInputIsExiting(),
            })}
            onClick={() => setInputIsExiting(true)}
          />
          <div
            className={styles['add-item-container']}
            onAnimationEnd={() => {
              if (getInputIsExiting()) {
                setInputIsOpen(false)
                setInputIsExiting(false)
                setInputValue('')
              }
            }}
          >
            {!getInputIsExiting() && (
              <div
                className={styles['switch-container']}
                classList={{
                  [styles.dark]: getTheme()?.theme === 'dark',
                }}
              >
                <Switch
                  isChecked={getUseMultipleEntries()}
                  onClick={() =>
                    setUseMultipleEntries(!getUseMultipleEntries())
                  }
                  label="Enter multiple"
                />
              </div>
            )}
            <TextField
              fullWidth
              forwardRef={(el) => setInputRef(el)}
              classes={{
                root: classnames(styles['text-field-container'], {
                  [styles['text-field-container-leave']]: getInputIsExiting(),
                }),
                input: classnames(styles['text-field-input'], {
                  [styles['text-field-input-leave']]: getInputIsExiting(),
                }),
              }}
              label={getInputIsExiting() ? '' : 'Title'}
              value={getInputValue()}
              onChange={(e) => {
                setInputValue(e.currentTarget.value ?? '')
              }}
            />
          </div>
        </>
      </Show>
      <Show when={!getInputIsOpen()}>
        <Fab onClick={() => setInputIsOpen(true)} icon="fa-solid fa-plus" />
      </Show>
    </>
  )
}

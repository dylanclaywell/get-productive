import { createSignal, JSX } from 'solid-js'
import MonsterBody from './MonsterBody'
import type { Props } from './MonsterBody'
import TextField from '../TextField'

const initialBorderRadius = {
  topLeft: 0,
  topRight: 0,
  bottomLeft: 0,
  bottomRight: 0,
}

export default function MonsterEditor() {
  const [getBorderRadius, setBorderRadius] =
    createSignal<Props['borderRadius']>(initialBorderRadius)

  const onChange: (
    key: keyof typeof initialBorderRadius
  ) => JSX.EventHandler<HTMLInputElement, InputEvent> = (key) => (event) => {
    console.log('hello')
    if (parseInt(event.currentTarget.value)) {
      setBorderRadius({
        ...getBorderRadius(),
        [key]: event.currentTarget.value,
      })
    }
  }

  return (
    <>
      <TextField
        label="Top Left Radius"
        value={getBorderRadius().topLeft.toString()}
        onChange={onChange('topLeft')}
      />
      <TextField
        label="Top Right Radius"
        value={getBorderRadius().topRight.toString()}
        onChange={onChange('topRight')}
      />
      <TextField
        label="Bottom Left Radius"
        value={getBorderRadius().bottomLeft.toString()}
        onChange={onChange('bottomLeft')}
      />
      <TextField
        label="Bottom Right Radius"
        value={getBorderRadius().bottomRight.toString()}
        onChange={onChange('bottomRight')}
      />
      <div className="border border-black w-40 h-40 m-auto">
        <MonsterBody borderRadius={getBorderRadius()} />
      </div>
    </>
  )
}

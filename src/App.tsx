import { createSignal } from 'solid-js'

import TextField from './components/TextField'

export default function App() {
  const [getValue, setValue] = createSignal<string>('')

  return (
    <div>
      <TextField
        label="Name"
        value={getValue()}
        onChange={(event) => setValue(event.target.nodeValue ?? '')}
      />
    </div>
  )
}

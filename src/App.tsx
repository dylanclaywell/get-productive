import { createSignal } from 'solid-js'

import TextField from './components/TextField'

export default function App() {
  const [getValue, setValue] = createSignal<string>('')

  return (
    <div className="m-auto w-[40rem] space-y-4">
      <h1 className="text-3xl">Welcome!</h1>
      <h2 className="text-2xl">Tell us your Monster Handler name.</h2>
      <TextField
        classes={{ input: 'w-full' }}
        label="Name"
        value={getValue()}
        onChange={(event) => {
          setValue(event.currentTarget.value ?? '')
        }}
      />
    </div>
  )
}

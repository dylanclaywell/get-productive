import { createSignal, JSX, Switch, Match } from 'solid-js'

import CreateAccountForm from '../components/CreateAccountForm'
import LoginForm from '../components/LoginForm'

type Context = 'login' | 'createAccount'

export default function Login() {
  const [getContext, setContext] = createSignal<Context>('login')

  return (
    <Switch>
      <Match when={getContext() === 'login'}>
        <LoginForm onCreateAccount={() => setContext('createAccount')} />
      </Match>
      <Match when={getContext() === 'createAccount'}>
        <CreateAccountForm onLogin={() => setContext('login')} />
      </Match>
    </Switch>
  )
}

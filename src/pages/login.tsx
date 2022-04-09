import { createSignal, JSX } from 'solid-js'

import Button from '../components/Button/Button'
import TextField from '../components/TextField'
import { State as UserState, useUser, useUserDispatch } from '../contexts/User'

import styles from './login.module.css'

interface FormFields {
  email: string
  password: string
}

export default function Login() {
  const [, { login }] = useUser()
  const [getFormFields, setFormFields] = createSignal<FormFields>({
    email: '',
    password: '',
  })

  const onInputChange =
    (name: keyof FormFields): JSX.EventHandler<HTMLInputElement, InputEvent> =>
    (e) => {
      setFormFields({ ...getFormFields(), [name]: e.currentTarget.value })
    }

  return (
    <div className={styles.root}>
      <div className={styles['login-container']}>
        <h1 className={styles.logo}>
          get<span>PRODUCTIVE</span>
        </h1>
        <div className={styles['inputs']}>
          <TextField
            label="Email"
            value={getFormFields().email}
            onChange={onInputChange('email')}
            fullWidth
          />
          <TextField
            type="password"
            label="Password"
            value={getFormFields().password}
            onChange={onInputChange('password')}
            fullWidth
          />
          <Button
            fullWidth
            label="Log In"
            onClick={() => {
              login(getFormFields().email, getFormFields().password)
            }}
          />
        </div>
      </div>
    </div>
  )
}

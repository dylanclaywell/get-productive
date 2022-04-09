import { render } from 'solid-js/web'

import './index.css'
import App from './App'

// Side-effect to load Firebase app
import './lib/firebase'

render(() => <App />, document.getElementById('root') as HTMLElement)

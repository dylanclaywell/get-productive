import { Router } from 'solid-app-router'

import Header from './components/Header/Header'
import Main from './pages/main'

export default function App() {
  return (
    <Router>
      <Header />
      <Main />
    </Router>
  )
}

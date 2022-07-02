import { Route, Routes } from 'solid-app-router'

import Downloads from './downloads'
import Home from './home'

import styles from './main.module.css'

export default function Main() {
  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/downloads" component={Downloads} />
    </Routes>
  )
}

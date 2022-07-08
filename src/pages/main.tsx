import { Route, Routes } from 'solid-app-router'

import Downloads from './downloads'
import Home from './home'

export default function Main() {
  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/downloads" component={Downloads} />
    </Routes>
  )
}

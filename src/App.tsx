import { Router, useRoutes } from 'solid-app-router'
import { RightClickProvider } from './contexts/RightClick'

import routes from './routes'

export default function App() {
  const Routes = useRoutes(routes)

  return (
    <RightClickProvider>
      <Router>
        <Routes />
      </Router>
    </RightClickProvider>
  )
}

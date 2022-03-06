import { lazy } from 'solid-js'

export default [
  {
    path: '/',
    component: lazy(() => import('./pages/main')),
  },
  {
    path: '/settings',
    component: lazy(() => import('./pages/settings')),
  },
]

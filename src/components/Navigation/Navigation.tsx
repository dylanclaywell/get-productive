import NavigationLink from './NavigationLink'

export default function Navigation() {
  return (
    <nav className="px-4 flex border-b border-b-gray-200">
      <NavigationLink label="monsters" href="/" />
      <NavigationLink label="editor" href="/editor" />
      <NavigationLink label="settings" href="/settings" />
    </nav>
  )
}

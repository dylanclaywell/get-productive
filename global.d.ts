declare module '*.css'
declare module '*.png'

declare module '*.graphql' {
  const content: string
  export default content
}

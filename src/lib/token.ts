let token: string | undefined

export function setToken(t: string | undefined) {
  token = t
}

export function getToken() {
  return token
}

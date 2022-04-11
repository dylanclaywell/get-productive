import { getToken } from '../lib/token'

export type QueryResponse<Data> =
  | {
      data: {
        // TODO fix this type
        [key: string]: Data
      }
    }
  | {
      errors: {
        message: string
      }[]
    }

export async function query<Variables = any, Response = any>(
  queryString: string,
  variables?: Variables
): Promise<QueryResponse<Response>> {
  return (
    await fetch('https://getproductiveapi.uk.r.appspot.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        query: queryString,
        variables,
      }),
    })
  ).json() as unknown as QueryResponse<Response>
}

export async function mutation<Variables = any, Response = any>(
  queryString: string,
  variables?: Variables
): Promise<QueryResponse<Response>> {
  return (
    await fetch('https://getproductiveapi.uk.r.appspot.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        query: queryString,
        variables,
      }),
    })
  ).json() as unknown as QueryResponse<Response>
}

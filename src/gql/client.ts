export interface QueryResponse<Data> {
  data: {
    // TODO fix this type
    [key: string]: Data
  }
}

export async function query<Variables = any, Response = any>(
  queryString: string,
  variables?: Variables
): Promise<QueryResponse<Response>> {
  return (
    await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
    await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: queryString,
        variables,
      }),
    })
  ).json() as unknown as QueryResponse<Response>
}

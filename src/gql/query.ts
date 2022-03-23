export default async function query<Variables = any, Response = any>(
  queryString: string,
  variables?: Variables
): Promise<Response> {
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
  ).json() as unknown as Response
}

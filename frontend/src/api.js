
export const client = async (
  endpoint,
  { data, headers: customHeaders, ...customConfig } = {},
) => {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }

  const response = await fetch(`${endpoint}`, config)
  const responseData  = await response.json()
  if(response.ok) {
    return responseData
  } else {
    return Promise.reject(responseData)
  }
}


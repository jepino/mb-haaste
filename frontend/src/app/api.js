export const client = async (
  endpoint,
  { data, headers: customHeaders, ...customConfig } = {}
) => {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  const response = await fetch(`${endpoint}`, config);
  if (!response.ok) {
    return Promise.reject(await response.json());
  }
  try {
    return await response.json();
  } catch (_e) {
    return response;
  }
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const buildUrl = (path, params = {}) => {
  const url = new URL(path, BASE_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, value);
    }
  });
  return url;
};

const handleResponse = async (response) => {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || 'Unable to process request');
  }
  return payload;
};

const apiClient = {
  get: (path, params) => fetch(buildUrl(path, params), { credentials: 'include' }).then(handleResponse),
  post: (path, body) =>
    fetch(new URL(path, BASE_URL), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include',
    }).then(handleResponse),
};

export default apiClient;

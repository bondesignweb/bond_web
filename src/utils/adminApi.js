// Bond Admin — API utility
const API_BASE = '/api';

let _token = sessionStorage.getItem('bond_token') || null;

export function setToken(t) {
  _token = t;
  if (t) sessionStorage.setItem('bond_token', t);
  else sessionStorage.removeItem('bond_token');
}

export function getToken() {
  return _token;
}

export function isAuthenticated() {
  return !!_token;
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (_token) headers['Authorization'] = `Bearer ${_token}`;

  // Don't set Content-Type for FormData
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401) {
    setToken(null);
    window.location.reload();
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Request failed');
  }

  return res.json();
}

// Auth
export const auth = {
  login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  me: () => request('/auth/me'),
};

// Dashboard
export const dashboard = {
  get: () => request('/dashboard'),
};

// Portfolios
export const portfolios = {
  list: () => request('/portfolios'),
  get: (id) => request(`/portfolios/${id}`),
  create: (data) => request('/portfolios', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/portfolios/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/portfolios/${id}`, { method: 'DELETE' }),
  uploadImages: (id, files) => {
    const fd = new FormData();
    files.forEach(f => fd.append('images', f));
    return request(`/portfolios/${id}/images`, { method: 'POST', body: fd });
  },
  deleteImage: (imageId) => request(`/portfolio-images/${imageId}`, { method: 'DELETE' }),
};

// Team
export const team = {
  list: () => request('/team'),
  get: (id) => request(`/team/${id}`),
  create: (data) => request('/team', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/team/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/team/${id}`, { method: 'DELETE' }),
  uploadPhoto: (id, file) => {
    const fd = new FormData();
    fd.append('photo', file);
    return request(`/team/${id}/photo`, { method: 'POST', body: fd });
  },
};

// Press
export const press = {
  list: () => request('/press'),
  get: (id) => request(`/press/${id}`),
  create: (data) => request('/press', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/press/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/press/${id}`, { method: 'DELETE' }),
  uploadPdf: (id, file) => {
    const fd = new FormData();
    fd.append('pdf', file);
    return request(`/press/${id}/pdf`, { method: 'POST', body: fd });
  },
};

// Analytics
export const analytics = {
  get: () => request('/analytics'),
};

// Users
export const users = {
  list: () => request('/users'),
  create: (data) => request('/users', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/users/${id}`, { method: 'DELETE' }),
};

// Media Gallery
export const media = {
  list: () => request('/media'),
  upload: (file) => {
    const token = sessionStorage.getItem('bond_token');
    const fd = new FormData();
    fd.append('file', file);
    return fetch('/api/media/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    }).then(r => r.json());
  },
};

// Media Gallery

// Categories
export const categories = {
  list: () => request('/categories'),
  create: (name) => request('/categories', { method: 'POST', body: JSON.stringify({ name }) }),
  delete: (id) => request(`/categories/${id}`, { method: 'DELETE' }),
};

// Locations
export const locations = {
  list: () => request('/locations'),
  create: (name) => request('/locations', { method: 'POST', body: JSON.stringify({ name }) }),
  delete: (id) => request(`/locations/${id}`, { method: 'DELETE' }),
};

// Team Members

// Journal Posts
export const journal = {
  list: (all) => request('/journal' + (all ? '?all=true' : '')),
  get: (id) => request(`/journal/${id}`),
  create: (data) => request('/journal', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/journal/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/journal/${id}`, { method: 'DELETE' }),
};

import apiClient from './apiClient';

export const fetchRoutes = params => apiClient.get('/api/routes', params);
export const fetchRouteById = id => apiClient.get(`/api/routes/${id}`);
export const fetchRouteSeatMap = (id, params) => apiClient.get(`/api/routes/${id}/seats`, params);
export const syncExternalRoute = routeSnapshot => apiClient.post('/api/routes/external/sync', { routeSnapshot });
export const createBooking = payload => apiClient.post('/api/bookings', payload);
export const fetchMetaSummary = () => apiClient.get('/api/meta/summary');

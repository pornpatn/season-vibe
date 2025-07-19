import api from './axios'

export const getVendors = () => api.get('/vendors')
export const getVendorItems = (vendorId) => api.get(`/vendors/${vendorId}/items`)

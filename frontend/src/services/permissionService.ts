import api from './axios'

export const getPermissionsByRole = (roleId) => api.get(`/roles/${roleId}/permissions`)
export const updateRolePermissions = (roleId, data) => api.put(`/roles/${roleId}/permissions`, data)

import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { getSession } from 'next-auth/react'

// Extend the AxiosRequestConfig to include metadata
declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    metadata?: {
      startTime: Date
    }
  }
}

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/api',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Get session for NextAuth.js
    const session = await getSession()
    
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`
    }
    
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log request duration in development
    if (process.env.NODE_ENV === 'development') {
      const duration = new Date().getTime() - (response.config.metadata?.startTime?.getTime() || 0)
      console.log(`API Request: ${response.config.method?.toUpperCase()} ${response.config.url} - ${duration}ms`)
    }
    
    return response
  },
  async (error) => {
    const originalRequest = error.config
    
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      // Try to refresh token or redirect to login
      if (typeof window !== 'undefined') {
        // Client-side: redirect to login
        window.location.href = '/sign-in'
      }
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network Error:', error.message)
      return Promise.reject(new Error('Network error. Please check your connection.'))
    }
    
    // Handle server errors
    if (error.response.status >= 500) {
      console.error('Server Error:', error.response.data)
      return Promise.reject(new Error('Server error. Please try again later.'))
    }
    
    return Promise.reject(error)
  }
)

// API methods for different resources
export const authAPI = {
  register: (data: any) => {
    console.log('Registration payload:', data); // Debug log
    
    // Ensure proper Content-Type and stringify data correctly
    const stringifiedData = JSON.stringify(data);
    console.log('Stringified data:', stringifiedData);
    
    return api.post('/auth/register', data, {
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  },
  login: (data: any) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) => 
    api.post('/auth/reset-password', { token, password }),
  getCurrentUser: () => api.get('/auth/me'),
}

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
  updateSettings: (data: any) => api.put('/users/settings', data),
  getSubscription: () => api.get('/users/subscription'),
  updateSubscription: (data: any) => api.put('/users/subscription', data),
  getUsage: () => api.get('/users/usage'),
  getBilling: () => api.get('/users/billing'),
}

export const messageAPI = {
  send: (data: any) => api.post('/messages/send', data),
  sendBulk: (data: any) => api.post('/messages/bulk', data),
  schedule: (data: any) => api.post('/messages/schedule', data),
  getMessages: (params?: any) => api.get('/messages', { params }),
  getConversations: (params?: any) => api.get('/messages/conversations/recent', { params }),
  getStats: () => api.get('/messages/stats'),
  getHistory: (params?: any) => api.get('/messages/history', { params }),
  cancelScheduled: (id: string) => api.delete(`/messages/schedule/${id}`),
}

export const contactAPI = {
  getContacts: (params?: any) => api.get('/contacts', { params }),
  createContact: (data: any) => api.post('/contacts', data),
  updateContact: (id: string, data: any) => api.put(`/contacts/${id}`, data),
  deleteContact: (id: string) => api.delete(`/contacts/${id}`),
  getContactById: (id: string) => api.get(`/contacts/${id}`),
  searchContacts: (params?: any) => api.get('/contacts/search', { params }),
  getContactStats: () => api.get('/contacts/stats'),
  getContactActivity: (id: string) => api.get(`/contacts/${id}/activity`),
  importContacts: (data: FormData) => api.post('/contacts/import', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  bulkOperations: (data: any) => api.post('/contacts/bulk', data),
}

export const templateAPI = {
  getTemplates: (params?: any) => api.get('/templates', { params }),
  createTemplate: (data: any) => api.post('/templates', data),
  updateTemplate: (id: string, data: any) => api.put(`/templates/${id}`, data),
  deleteTemplate: (id: string) => api.delete(`/templates/${id}`),
  getTemplateById: (id: string) => api.get(`/templates/${id}`),
  duplicateTemplate: (id: string) => api.post(`/templates/${id}/duplicate`),
  getTemplateStats: () => api.get('/templates/stats'),
}

export const campaignAPI = {
  getCampaigns: (params?: any) => api.get('/campaigns', { params }),
  createCampaign: (data: any) => api.post('/campaigns', data),
  updateCampaign: (id: string, data: any) => api.put(`/campaigns/${id}`, data),
  deleteCampaign: (id: string) => api.delete(`/campaigns/${id}`),
  getCampaignById: (id: string) => api.get(`/campaigns/${id}`),
  startCampaign: (id: string) => api.post(`/campaigns/${id}/start`),
  pauseCampaign: (id: string) => api.post(`/campaigns/${id}/pause`),
  getCampaignStats: (id: string) => api.get(`/campaigns/${id}/stats`),
  previewCampaign: (id: string) => api.get(`/campaigns/${id}/preview`),
}

export const analyticsAPI = {
  getDashboardStats: () => api.get('/analytics/dashboard'),
  getMessageAnalytics: (params?: any) => api.get('/analytics/messages', { params }),
  getCampaignAnalytics: (params?: any) => api.get('/analytics/campaigns', { params }),
  getContactAnalytics: (params?: any) => api.get('/analytics/contacts', { params }),
  getEngagementAnalytics: (params?: any) => api.get('/analytics/engagement', { params }),
  getCostAnalytics: (params?: any) => api.get('/analytics/costs', { params }),
  exportAnalytics: (params?: any) => api.get('/analytics/export', { params, responseType: 'blob' }),
}

export const uploadAPI = {
  uploadMedia: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/upload/media', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  uploadContacts: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/upload/contacts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  uploadAvatar: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/upload/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  uploadMultiple: (files: File[]) => {
    const formData = new FormData()
    files.forEach(file => formData.append('files', file))
    return api.post('/upload/bulk', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  deleteFile: (fileId: string) => api.delete(`/upload/${fileId}`),
  getFileInfo: (fileId: string) => api.get(`/upload/${fileId}`),
}

export const adminAPI = {
  getUsers: (params?: any) => api.get('/users', { params }),
  getUserById: (id: string) => api.get(`/users/${id}`),
  updateUser: (id: string, data: any) => api.put(`/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/users/${id}`),  suspendUser: (id: string) => api.post(`/users/${id}/suspend`),
  unsuspendUser: (id: string) => api.post(`/users/${id}/unsuspend`),
}

// Generic API helpers
export const apiHelpers = {
  handleApiError: (error: any) => {
    if (error.response?.data?.message) {
      return error.response.data.message
    }
    
    if (error.message) {
      return error.message
    }
    
    return 'An unexpected error occurred'
  },
  
  buildQueryParams: (params: Record<string, any>) => {
    const searchParams = new URLSearchParams()
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(item => searchParams.append(key, item))
        } else {
          searchParams.append(key, value.toString())
        }
      }
    })
    
    return searchParams.toString()
  },
}

export default api

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
  },
  
  // User endpoints
  USERS: {
    ME: '/api/users/me',
    UPDATE_PROFILE: '/api/users/profile',
    UPDATE_SETTINGS: '/api/users/settings',
    DELETE_ACCOUNT: '/api/users/delete',
  },
  
  // Message endpoints
  MESSAGES: {
    SEND: '/api/messages/send',
    BULK: '/api/messages/bulk',
    SCHEDULE: '/api/messages/schedule',
    LIST: '/api/messages',
    HISTORY: '/api/messages/history',
    ANALYTICS: '/api/messages/analytics',
  },
  
  // Contact endpoints
  CONTACTS: {
    LIST: '/api/contacts',
    CREATE: '/api/contacts',
    UPDATE: '/api/contacts',
    DELETE: '/api/contacts',
    IMPORT: '/api/contacts/import',
    EXPORT: '/api/contacts/export',
    BULK_DELETE: '/api/contacts/bulk-delete',
  },
  
  // Template endpoints
  TEMPLATES: {
    LIST: '/api/templates',
    CREATE: '/api/templates',
    UPDATE: '/api/templates',
    DELETE: '/api/templates',
    DUPLICATE: '/api/templates/duplicate',
  },
  
  // Admin endpoints
  ADMIN: {
    USERS: '/api/admin/users',
    ANALYTICS: '/api/admin/analytics',
    REPORTS: '/api/admin/reports',
    SYSTEM_STATS: '/api/admin/system',
  },
  
  // Webhook endpoints
  WEBHOOKS: {
    WHATSAPP: '/api/webhooks/whatsapp',
    STRIPE: '/api/webhooks/stripe',
  },
  
  // File upload endpoints
  UPLOAD: {
    MEDIA: '/api/upload/media',
    CONTACTS: '/api/upload/contacts',
  },
}

export const SUBSCRIPTION_PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    currency: 'USD',
    interval: 'month',
    features: [
      '50 messages per month',
      '10 contacts',
      'Basic templates',
      'Email support',
    ],
    limits: {
      messagesPerMonth: 50,
      contacts: 10,
      templates: 5,
      bulkMessagesPerBatch: 5,
    },
  },
  STARTER: {
    id: 'starter',
    name: 'Starter',
    price: 29,
    currency: 'USD',
    interval: 'month',
    stripePriceId: 'price_starter_monthly',
    features: [
      '1,000 messages per month',
      '500 contacts',
      'Custom templates',
      'Scheduled messaging',
      'Basic analytics',
      'Priority email support',
    ],
    limits: {
      messagesPerMonth: 1000,
      contacts: 500,
      templates: 20,
      bulkMessagesPerBatch: 50,
    },
  },
  PROFESSIONAL: {
    id: 'professional',
    name: 'Professional',
    price: 99,
    currency: 'USD',
    interval: 'month',
    stripePriceId: 'price_professional_monthly',
    features: [
      '5,000 messages per month',
      '2,500 contacts',
      'Advanced templates',
      'Bulk messaging',
      'Advanced analytics',
      'API access',
      'Phone support',
    ],
    limits: {
      messagesPerMonth: 5000,
      contacts: 2500,
      templates: 100,
      bulkMessagesPerBatch: 200,
    },
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    currency: 'USD',
    interval: 'month',
    stripePriceId: 'price_enterprise_monthly',
    features: [
      'Unlimited messages',
      'Unlimited contacts',
      'Unlimited templates',
      'Advanced automation',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
    ],
    limits: {
      messagesPerMonth: -1, // -1 means unlimited
      contacts: -1,
      templates: -1,
      bulkMessagesPerBatch: 1000,
    },
  },
}

export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  DOCUMENT: 'document',
  VIDEO: 'video',
  AUDIO: 'audio',
} as const

export const MESSAGE_STATUS = {
  PENDING: 'pending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  FAILED: 'failed',
} as const

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const

export const CONTACT_TAGS = [
  'Customer',
  'Lead',
  'VIP',
  'Support',
  'Marketing',
  'Sales',
  'Newsletter',
  'Important',
] as const

export const TEMPLATE_CATEGORIES = {
  MARKETING: 'marketing',
  UTILITY: 'utility',
  AUTHENTICATION: 'authentication',
} as const

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ar', name: 'Arabic' },
] as const

export const TIMEZONES = [
  { value: 'UTC', label: 'UTC (GMT+0)' },
  { value: 'America/New_York', label: 'Eastern Time (GMT-5)' },
  { value: 'America/Chicago', label: 'Central Time (GMT-6)' },
  { value: 'America/Denver', label: 'Mountain Time (GMT-7)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (GMT-8)' },
  { value: 'Europe/London', label: 'London (GMT+0)' },
  { value: 'Europe/Paris', label: 'Paris (GMT+1)' },
  { value: 'Europe/Berlin', label: 'Berlin (GMT+1)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (GMT+9)' },
  { value: 'Asia/Shanghai', label: 'Shanghai (GMT+8)' },
  { value: 'Asia/Kolkata', label: 'India (GMT+5:30)' },
] as const

export const FILE_UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 16 * 1024 * 1024, // 16MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/quicktime'],
  ALLOWED_AUDIO_TYPES: ['audio/mpeg', 'audio/ogg', 'audio/wav'],
} as const

export const RATE_LIMITS = {
  MESSAGE_SENDING: {
    REQUESTS_PER_MINUTE: 60,
    REQUESTS_PER_HOUR: 1000,
    REQUESTS_PER_DAY: 10000,
  },
  API_GENERAL: {
    REQUESTS_PER_MINUTE: 100,
    REQUESTS_PER_HOUR: 2000,
  },
} as const

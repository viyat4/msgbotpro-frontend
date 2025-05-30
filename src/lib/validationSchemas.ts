import { z } from "zod"

// Auth schemas
export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// New schema for client-side form validation
export const clientSignUpSchema = z.object({
  name: z.string().min(1, "Full name is required").min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string()
    .optional()
    .refine(
      (val) => !val || /^\+[1-9]\d{7,14}$/.test(val),
      "Phone number must be in E.164 format (+[country code][number], e.g., +12125551234)"
    ),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Message schemas
export const sendMessageSchema = z.object({
  recipient: z.string().min(1, "Recipient is required"),
  message: z.string().min(1, "Message is required").max(4096, "Message too long"),
  type: z.enum(["text", "image", "document", "video"]).default("text"),
  media: z.string().optional(),
  schedule: z.date().optional(),
})

export const bulkMessageSchema = z.object({
  recipients: z.array(z.string()).min(1, "At least one recipient is required"),
  message: z.string().min(1, "Message is required").max(4096, "Message too long"),
  type: z.enum(["text", "image", "document", "video"]).default("text"),
  media: z.string().optional(),
  schedule: z.date().optional(),
  batchSize: z.number().min(1).max(100).default(10),
  delayBetweenMessages: z.number().min(1000).default(5000), // milliseconds
})

// Contact schemas
export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phoneNumber: z.string()
    .min(1, "Phone number is required")
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  email: z.string().email().optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  customFields: z.record(z.string()).default({}),
})

export const importContactsSchema = z.object({
  file: z.instanceof(File, { message: "Please select a CSV file" }),
  mapping: z.object({
    name: z.string().min(1, "Name column is required"),
    phoneNumber: z.string().min(1, "Phone number column is required"),
    email: z.string().optional(),
  }),
})

// Template schemas
export const templateSchema = z.object({
  name: z.string().min(1, "Template name is required"),
  content: z.string().min(1, "Template content is required").max(4096, "Template too long"),
  variables: z.array(z.string()).default([]),
  category: z.enum(["marketing", "utility", "authentication"]).default("utility"),
  language: z.string().default("en"),
})

// Settings schemas
export const userSettingsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  timezone: z.string().default("UTC"),
  notifications: z.object({
    email: z.boolean().default(true),
    messageDelivery: z.boolean().default(true),
    weeklyReport: z.boolean().default(true),
  }).default({}),
})

export const whatsappSettingsSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  phoneNumber: z.string()
    .min(1, "Phone number is required")
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  apiToken: z.string().min(1, "API token is required"),
  webhookUrl: z.string().url("Please enter a valid webhook URL").optional(),
})

// Admin schemas
export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["user", "admin"]).default("user"),
  plan: z.enum(["free", "starter", "professional", "enterprise"]).default("free"),
})

export const updateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Please enter a valid email address").optional(),
  role: z.enum(["user", "admin"]).optional(),
  plan: z.enum(["free", "starter", "professional", "enterprise"]).optional(),
  isActive: z.boolean().optional(),
})

// Type exports
export type SignInForm = z.infer<typeof signInSchema>
export type SignUpForm = z.infer<typeof clientSignUpSchema>
export type SendMessageForm = z.infer<typeof sendMessageSchema>
export type BulkMessageForm = z.infer<typeof bulkMessageSchema>
export type ContactForm = z.infer<typeof contactSchema>
export type ImportContactsForm = z.infer<typeof importContactsSchema>
export type TemplateForm = z.infer<typeof templateSchema>
export type UserSettingsForm = z.infer<typeof userSettingsSchema>
export type WhatsAppSettingsForm = z.infer<typeof whatsappSettingsSchema>
export type CreateUserForm = z.infer<typeof createUserSchema>
export type UpdateUserForm = z.infer<typeof updateUserSchema>

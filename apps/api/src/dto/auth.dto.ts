import { z } from 'zod'

export const registerSchema = z.object({
  phone: z.string().min(1),
  full_name: z.string().min(1),
  pin: z.string().regex(/^\d{4,6}$/)
})

export const loginSchema = z.object({
  phone: z.string().min(1),
  pin: z.string().min(1)
})

export const loginVerifySchema = z.object({
  phone: z.string().min(1),
  code: z.string().length(6)
})

export type RegisterDto = z.infer<typeof registerSchema>
export type LoginDto = z.infer<typeof loginSchema>
export type LoginVerifyDto = z.infer<typeof loginVerifySchema>


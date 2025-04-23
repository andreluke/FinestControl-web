import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.string(),
  NEXT_PUBLIC_API_URL_PROD: z.string().url(),
  NEXT_PUBLIC_API_URL_DEV: z.string().url(),
})

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_API_URL_PROD: process.env.NEXT_PUBLIC_API_URL_PROD,
  NEXT_PUBLIC_API_URL_DEV: process.env.NEXT_PUBLIC_API_URL_DEV,
})

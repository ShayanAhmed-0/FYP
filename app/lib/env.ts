import { z } from "zod"

// Define environment variable schema
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1),

  // Authentication
  JWT_SECRET: z.string().min(1),

  // Optional: Cloud services for image processing
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
})

// Parse and validate environment variables
function validateEnv() {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    console.error("Invalid environment variables:", error)
    throw new Error("Invalid environment variables")
  }
}

// Export validated environment variables
export const env = validateEnv()

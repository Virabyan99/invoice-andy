import { z } from 'zod'

export const onboardingSchema = z.object({
  firstName: z.string().min(3, 'First name is required').max(100),
  lastName: z.string().min(3, 'Last name is required').max(100),
  address: z.string().min(3, 'Address is required').max(150),
})

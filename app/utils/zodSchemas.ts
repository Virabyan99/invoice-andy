import { z } from 'zod'

export const onboardingSchema = z.object({
  firstName: z.string().min(3, 'First name is required').max(100),
  lastName: z.string().min(3, 'Last name is required').max(100),
  address: z.string().min(3, 'Address is required').max(150),
})

export const invoiceSchema = z.object({
  invoiceName: z.string().min(1, 'invoiceName name is required').max(100),
  total: z.number().min(1, "1 is the minimum amount"),
  status: z.enum(["PAID", "PENDING"]).default("PENDING"),
  date: z.string().min(1, "Date is Required"),
  dueDate: z.number().min(0, "Due Date is required"),
  fromName: z.string().min(1, "Your Name is Required"),
  fromEmail: z.string().email("Invalid email Address").min(1, "Your Email is Required"),
  fromAddress: z.string().min(1, "Your Address is Required"),
  clientName: z.string().min(1, "Client Name is Required"),
  clientEmail: z.string().email("Invalid email Address").min(1, "Client Email is Required"),
  clientAddress: z.string().min(1, "Client Address is Required"),
  currency: z.string().min(1, "Currency is Required"),
  invoiceNumber: z.number().min(1, "Invoice Number is required"),
  note: z.string().optional(),
  invoiceItemDescription: z.string().min(1, "Description is required"),
  invoiceItemQuantity: z.number().min(1, "Quantity min 1"),
  invoiceItemRate: z.number().min(1, "Rate min 1"),
})





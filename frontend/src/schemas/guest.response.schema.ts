import { z } from "zod";

export const guestSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  fName: z.string(),
  lName: z.string(),
  phone: z.number(),
  email: z.string(),
  address: z.string(),
  personalID: z.number(),
  birthDate: z.date(),
  notes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const guestArraySchema = z.array(guestSchema);

export const guestSimpleSchema = z.object({
  fName: z.string().min(1, "First name is required"),
  lName: z.string().min(1, "Last name is required"),
  phone: z.number().min(1, "Phone number is required"),
  email: z.string().min(1, "Email is required"),
  address: z.string().min(1, "Address is required"),
  personalID: z.number().min(1, "Personal ID is required"),
  birthDate: z
    .string()
    .min(1, "Birth date is required")
    .max(25, "Birth date must be less than 25 characters"),
  notes: z.string().optional(),
});

export type guestSimpleSchemaType = z.infer<typeof guestSimpleSchema>;

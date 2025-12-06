import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(5).max(100),
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não coicidem.',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const medicationSchema = z.object({
  name: z.string().min(1),
  time: z.string().min(1),
  quantity: z.string().min(1),
  description: z.string().optional(),
});

export type RegisterType = z.infer<typeof registerSchema>;
export type LoginType = z.infer<typeof loginSchema>;
export type MedicationType = z.infer<typeof medicationSchema>;

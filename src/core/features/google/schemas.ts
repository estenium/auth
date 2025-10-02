import { z } from 'zod';

export const googleSignInSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: 'Email is required',
    })
    .email({
      message: 'Invalid email',
    })
    .refine((val) => val.endsWith('@gmail.com'), {
      message: 'Email must be a gmail.com address',
    }),
  password: z
    .string()
    .nonempty({
      message: 'Password is required',
    })
    .min(6, {
      message: 'Password is too short.',
    }),
});

export type GoogleSignInSchema = z.infer<typeof googleSignInSchema>;

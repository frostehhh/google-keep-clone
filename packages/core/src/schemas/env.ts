import { z } from 'zod';

export const EnvSchema = z.object({
  AWS_CUSTOM_ACCESS_KEY_ID: z.string(),
  AWS_CUSTOM_SECRET_ACCESS_KEY: z.string(),
});

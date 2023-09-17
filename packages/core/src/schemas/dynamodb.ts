import { z } from 'zod';

export const AuditableSchema = z.object({
  createdAt: z.coerce.date(),
  modifiedAt: z.coerce.date(),
});

export const EntitySchema = z.object({
  entity: z.string(),
});

export const BaseDbRecordSchema = AuditableSchema.merge(EntitySchema);
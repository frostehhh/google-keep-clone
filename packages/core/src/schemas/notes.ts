import { z } from 'zod';

import { BaseDbRecordSchema } from './dynamodb';

export const NoteSchema = z.object({
  noteId: z.string(),
  userId: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
}).merge(BaseDbRecordSchema);

export type NoteType = z.infer<typeof NoteSchema>;

export const GetNoteSchema = NoteSchema.pick({ noteId: true });

export const UpdateNoteParamsSchema = GetNoteSchema;
export const UpdateNoteBodySchema = NoteSchema.pick({ noteId: true, title: true, content: true });
export type UpdateNoteBodyType = z.infer<typeof UpdateNoteBodySchema>;
export const CreateNoteBodySchema = NoteSchema.pick({ title: true, content: true });
export type CreateNoteBodyType = z.infer<typeof CreateNoteBodySchema>;

export const DeleteNoteSchema = GetNoteSchema;
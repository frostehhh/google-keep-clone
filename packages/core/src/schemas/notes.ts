import { z } from 'zod';

export const GetNoteSchema = z.object({
  noteId: z.string(),
});

export const UpdateNoteParamsSchema = GetNoteSchema;
export const UpdateNoteBodySchema = z.object({
  title: z.string().nullable(),
  content: z.string().nullable(),
});
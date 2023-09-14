import { z } from 'zod';

export const GetNoteSchema = z.object({
  noteId: z.string(),
});
import { type NoteType } from '@google-keep-clone/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteNote, getNotes, updateNote } from './api';

export const useGetNotes = () => useQuery({
  queryKey: ['notes'],
  queryFn: getNotes,
  refetchOnWindowFocus: false,
});

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNote,
    onSuccess: (data: NoteType) => {
      queryClient.setQueryData(['notes', { noteId: data.noteId }], data);
    },
  });
};

export const useDeleteNote = () => useMutation({
  mutationFn: deleteNote,
});
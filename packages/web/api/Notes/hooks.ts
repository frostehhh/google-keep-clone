import { type NoteType } from '@google-keep-clone/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Auth } from 'aws-amplify';

import { createNote, deleteNote, getNotes, updateNote } from './api';

export const useGetNotes = () => useQuery({
  queryKey: ['notes'],
  queryFn: getNotes,
  refetchOnWindowFocus: false,
});

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onMutate: async (newNote) => {
      await queryClient.cancelQueries({ queryKey: ['notes'] });
      const previousNotes: NoteType | undefined = queryClient.getQueryData(['notes']);

      // TODO: Improve typings
      const userInfo = await Auth.currentUserInfo() as { id: string };
      const modifiedNewNote: NoteType = { ...newNote, noteId: `TEMP_${crypto.randomUUID()}`, userId: userInfo.id } as NoteType;
      queryClient.setQueryData<NoteType[] | undefined>(['notes'], (old) => old ? [...old, modifiedNewNote] : [modifiedNewNote]);

      return { previousNotes };
    },
    onError(err, newTodo, context) {
      queryClient.setQueryData(['todos'], context?.previousNotes);
    },
  });
};

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
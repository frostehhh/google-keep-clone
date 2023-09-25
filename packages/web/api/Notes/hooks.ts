import { type NoteType, TEMPORARY_ID_PREFIX } from '@google-keep-clone/core';
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
      const tempNewNote: NoteType = { ...newNote, noteId: `${TEMPORARY_ID_PREFIX}${crypto.randomUUID()}`, userId: userInfo.id } as NoteType;
      queryClient.setQueryData<NoteType[] | undefined>(['notes'], (old) => old ? [...old, tempNewNote] : [tempNewNote]);

      return { previousNotes, tempNewNote };
    },
    onSuccess(data, createdNoteInput, context) {
      const createdNote = data.Attributes as unknown as NoteType;
      queryClient.setQueryData<NoteType[] | undefined>(['notes'], (old) => {
        return old ? old.map((note) => note.noteId === context?.tempNewNote.noteId ? createdNote : note) : [createdNote];
      });
    },
    onError(err, note, context) {
      queryClient.setQueryData(['notes'], context?.previousNotes);
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

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (noteId: NoteType['noteId']) => {
      if (noteId.startsWith(TEMPORARY_ID_PREFIX)) return Promise.resolve(null);
      return deleteNote(noteId);
    },
    onMutate(deletedNoteId) {
      const previousNotes: NoteType[] | undefined = queryClient.getQueryData(['notes']);

      queryClient.setQueryData<NoteType[]>(['notes'], (oldNotes) => {
        if (!oldNotes) return;

        return oldNotes.filter(({ noteId }) => noteId !== deletedNoteId);
      });

      return { previousNotes };
    },
    onError(err, note, context) {
      queryClient.setQueryData(['notes'], context?.previousNotes);
    },
  });
};
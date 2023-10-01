import { type NoteType, TEMPORARY_ID_PREFIX } from '@google-keep-clone/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Auth } from 'aws-amplify';

import { createNote, deleteNote, getNotes, updateNote } from './api';

export const useGetNotes = () => useQuery({
  queryKey: ['notes'],
  queryFn: getNotes,
  refetchOnWindowFocus: false,
});

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NoteType) => {
      if (data.noteId.startsWith(TEMPORARY_ID_PREFIX)) {
        queryClient.setQueryData<NoteType[] | undefined>(['notes'], (old) => {
          return old
            ? old.map((note) => note.noteId === data.noteId ? data : note)
            : old;
        });
        queryClient.setQueryData(['notes', { noteId: data.noteId }], () => ({ isUpdated: true, tempNoteId: data.noteId }));
        return Promise.resolve(null);
      }
      return updateNote(data);
    },
    onMutate(updatedNote) {
      if (!updatedNote) return;

      const tempNoteUpdatedToDbNoteQueryKey = ['notes', { updatedNoteId: updatedNote.noteId }];
      const noteToUpdate = queryClient.getQueryData<{ updatedNoteId: string, tempNoteId: string }>(tempNoteUpdatedToDbNoteQueryKey);
      if (noteToUpdate) {
        const { updatedNoteId, tempNoteId } = noteToUpdate;
        queryClient.removeQueries(tempNoteUpdatedToDbNoteQueryKey);
        queryClient.setQueryData<NoteType[] | undefined>(['notes'], (old) => old
          ? old.map((note) => note.noteId === tempNoteId ? ({ ...updatedNote, noteId: updatedNoteId }) : note)
          : old);
      } else {
        queryClient.setQueryData<NoteType[] | undefined>(['notes'], (old) => {
          return old
            ? old.map((note) => note.noteId === updatedNote.noteId ? updatedNote : note)
            : old;
        });
      }
    },
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  const updateMutation = useUpdateNote();

  return useMutation({
    mutationFn: createNote,
    mutationKey: ['createNote'],
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
      const tempNoteQueryKey = ['notes', { noteId: context?.tempNewNote.noteId }];
      const { isUpdated } = queryClient.getQueryData<{ isUpdated: boolean } | undefined>(tempNoteQueryKey) ?? {};

      if (isUpdated) {
        queryClient.removeQueries(tempNoteQueryKey);
        const notes = queryClient.getQueryData<NoteType[]>(['notes']);
        const updatedNote = notes?.find(({ noteId }) => noteId === context?.tempNewNote.noteId);
        if (updatedNote) {
          queryClient.setQueryData(['notes', { updatedNoteId: createdNote.noteId }], () => ({ updatedNoteId: createdNote.noteId, tempNoteId: context?.tempNewNote.noteId }));
          updateMutation.mutate({ ...createdNote, ...updatedNote, noteId: createdNote.noteId });
        }
      } else {
        queryClient.setQueryData<NoteType[] | undefined>(['notes'], (old) => {
          return old ? old.map((note) => note.noteId === context?.tempNewNote.noteId ? createdNote : note) : [createdNote];
        });
      }
    },
    onError(err, note, context) {
      queryClient.setQueryData(['notes'], context?.previousNotes);
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
'use client';

import { type NoteType } from '@google-keep-clone/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useController, useForm } from 'react-hook-form';

import { deleteNote, getNotes, updateNote } from '@/api/Notes';
import { Dialog } from '@/components/ui/Dialog';
import TextArea from '@/components/ui/TextArea';
import TextField from '@/components/ui/TextField';

import Note from '../Note/Note';

export default function NotesList() {
  const { data, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  });
  const updateMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mutationFn: updateNote,
    onSuccess: (data: NoteType) => {
      queryClient.setQueryData(['notes', { noteId: data.noteId }], data);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
  });
  const queryClient = useQueryClient();
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);

  const { watch, formState, reset, control, handleSubmit, getValues } = useForm<NoteType>({
    defaultValues: {
      title: '',
      content: '',
    },
    mode: 'onChange',
  });
  const { field: titleInputProps } = useController({ name: 'title', control });
  const { field: contentInputProps } = useController({ name: 'content', control });

  if (isLoading || !data) {
    return;
  }

  const handleClick = (note: NoteType) => () => {
    reset(note);
    setIsNoteDialogOpen(true);
  };

  const handleDelete = (noteId: NoteType['noteId']) => {
    deleteMutation.mutate(noteId);
  };

  const handleDialogOpenChange = (open: boolean) => {
    console.log('handledialogOpenchange', { values: getValues(), isDirty: formState.isDirty });
    if (!open && formState.isDirty) {
      updateMutation.mutate(getValues());
      void queryClient.invalidateQueries({ queryKey: ['notes'] });
    }

    setIsNoteDialogOpen(open);
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {data.map((note) => <Note key={note.noteId} data={note} onDelete={handleDelete} onClick={handleClick(note)} />)}
      <Dialog.Root open={isNoteDialogOpen} onOpenChange={handleDialogOpenChange}>
        <Dialog.Content>
          <Dialog.Title>
            <TextField {...titleInputProps} placeholder='Title' />
          </Dialog.Title>
          <Dialog.Description>
            <TextArea
              {...contentInputProps}
              classes={{ root: 'px-4 py-3 box-content h-5	text-sm', textarea: 'h-full w-full outline-none' }}
              placeholder="Take a note..."
              aria-label='Take a note...' />
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
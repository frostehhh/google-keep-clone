'use client';

import { useQuery } from '@tanstack/react-query';

import { getNotes } from '@/api/Notes';

import Note from '../Note/Note';

export default function NotesList() {
  const { data, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  });

  console.log('NotesList', { data, isLoading });

  if (isLoading || !data) {
    return;
  }

  return (
    <div className="flex gap-4 flex-wrap">
      {data.map((note) => <Note key={note.noteId} {...note} />)}
    </div>
  );
}
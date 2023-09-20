import { type NoteType } from '@google-keep-clone/core';
import { X } from 'lucide-react';
import React, { type DetailedHTMLProps, type HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

import styles from './Note.module.css';

type NoteProps = {
  data: NoteType;
  onDelete: (id: NoteType['noteId']) => void;
} & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'title' | 'content'>;

const Note = React.forwardRef<HTMLDivElement, NoteProps>(({ data, onDelete, ...props }, ref) => {
  const { className, ...restRootProps } = props;
  const { title, content } = data;

  const handleDelete: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    onDelete(data.noteId);
  };

  return (
    <div className={cn(styles.noteRoot, 'relative flex gap-2 flex-col border border-neutral-200 h-52 w-52 py-3 px-4 rounded-lg', className)} ref={ref} {...restRootProps}>
      <div onClick={handleDelete} className={cn(styles.close, 'hidden absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground')}>
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </div>
      <h1 className="text-xl">
        {title}
      </h1>
      <p className="text-base">
        {content}
      </p>
    </div>
  );
});

Note.displayName = 'Note';
export default Note;

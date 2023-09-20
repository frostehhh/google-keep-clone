import { type NoteType } from '@google-keep-clone/core';
import React, { type DetailedHTMLProps, type HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type NoteProps = {
  data: Pick<NoteType, 'content' | 'title'>;
} & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'title' | 'content'>;

const Note = React.forwardRef<HTMLDivElement, NoteProps>(({ data, ...props }, ref) => {
  const { className, ...restRootProps } = props;
  const { title, content } = data;

  return (
    <div className={cn('flex gap-2 flex-col border border-neutral-200 h-52 w-52 py-3 px-4 rounded-lg', className)} ref={ref} {...restRootProps}>
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

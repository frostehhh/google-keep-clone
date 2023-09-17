import { type NoteType } from '@google-keep-clone/core';

type NoteProps = Pick<NoteType, 'content' | 'title'>

export default function Note({ title, content }: NoteProps) {
  return (
    <div className="flex gap-2 flex-col border border-neutral-200 h-52 w-52 py-3 px-4 rounded-lg">
      <h1 className="text-xl">
        {title}
      </h1>
      <p className="text-base">
        {content}
      </p>
    </div>
  );
}
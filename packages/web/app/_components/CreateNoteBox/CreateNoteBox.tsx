'use client';

import { useController, useForm } from 'react-hook-form';

import TextArea from '@/components/ui/TextArea';
import TextField from '@/components/ui/TextField';

import { useFocusWithinCreateNote } from './CreateNotebox.utils';

const CreateNoteBox = () => {
  const { watch, formState, reset, control } = useForm({
    defaultValues: {
      title: '',
      content: '',
    },
    mode: 'onChange',
  });
  const { focused, focusWithinProps } = useFocusWithinCreateNote({ values: watch(), isFormTouched: formState.isDirty, resetForm: reset });
  const { field: titleInputProps } = useController({ name: 'title', control });
  const { field: contentInputProps } = useController({ name: 'content', control });

  return (
    <div {...focusWithinProps} className="w-96 h-50 shadow-lg shadow-indigo-500/40">
      <form>
        {focused && (
          <TextField {...titleInputProps} placeholder='Title' />
        )}
        <TextArea
          {...contentInputProps}
          classes={{ root: 'px-4 py-3 box-content h-5	text-sm', textarea: 'h-full w-full outline-none' }}
          placeholder="Take a note..."
          aria-label='Take a note...' />
      </form>

    </div>
  );
};
export default CreateNoteBox;

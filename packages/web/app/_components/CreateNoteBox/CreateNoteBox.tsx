import { useForm } from '@tanstack/react-form';

import TextArea from '@/components/ui/TextArea';
import TextField from '@/components/ui/TextField';

import { useFocusWithinCreateNote } from './CreateNotebox.utils';

const CreateNoteBox = () => {
  const form = useForm({
    defaultValues: {
      title: '',
      content: '',
    },
  });
  const { focused, focusWithinProps } = useFocusWithinCreateNote({ values: form.state.values, isFormTouched: form.state.isTouched, resetForm: form.reset });

  return (
    <div {...focusWithinProps} className="w-96 h-50 shadow-lg shadow-indigo-500/40">
      <form.Provider>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          {focused && (
            <div>
              <form.Field name="title">
                {(field) => {
                  return <TextField name={field.name} value={field.state.value} placeholder='Title' onChange={(value) => field.handleChange(value)} />;
                }}
              </form.Field>
            </div>
          )}
          <div>
            <form.Field name="content">
              {(field) => {
                return (
                  <TextArea
                    name={field.name}
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    classes={{ root: 'px-4 py-3 box-content h-5	text-sm', textarea: 'h-full w-full outline-none' }}
                    placeholder="Take a note..."
                    aria-label='Take a note...' />
                );
              }}
            </form.Field>
          </div>
        </form>
      </form.Provider>

    </div>
  );
};
export default CreateNoteBox;

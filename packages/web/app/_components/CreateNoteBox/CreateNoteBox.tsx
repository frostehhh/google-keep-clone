import { TextArea } from '@/components';

import { useFocusWithinCreateNote } from './CreateNotebox.utils';

const CreateNoteBox = () => {
  const { focusWithinProps } = useFocusWithinCreateNote();

  return (
    <div {...focusWithinProps} className="w-96 h-50 shadow-lg shadow-indigo-500/40">
      <TextArea classes={{ root: 'px-4 py-3 box-content h-5	text-sm', textarea: 'h-full w-full outline-none' }} placeholder="Take a note..." aria-label='Take a note...' />
    </div>
  );
};
export default CreateNoteBox;

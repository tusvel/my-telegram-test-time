import { Switch } from '@headlessui/react';
import cn from 'classnames';
import { FC } from 'react';

const Toggle: FC<{ value: boolean; onChange: any }> = ({ value, onChange }) => {
  return (
    <Switch
      checked={value}
      onChange={onChange}
      className={cn(
        value ? 'bg-indigo-600' : 'bg-stone-300',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          value ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      />
    </Switch>
  );
};

export default Toggle;

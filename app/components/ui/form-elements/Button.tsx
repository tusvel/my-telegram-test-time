import cn from 'classnames';
import { FC } from 'react';

import { IButton } from '@/ui/form-elements/form.interface';

import styles from './form.module.scss';

const Button: FC<IButton> = ({ children, className, ...rest }) => {
  return (
    <button
      {...rest}
      className={cn(
        'inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        styles.button,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;

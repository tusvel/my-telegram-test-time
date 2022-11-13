import { FC, PropsWithChildren } from 'react';

import Button from '@/ui/form-elements/Button';

import { useOutside } from '@/hooks/useOutside';

import styles from './Modal.module.scss';

const Modal: FC<PropsWithChildren & { title: string }> = ({
  children,
  title
}) => {
  const { isShow, setIsShow, ref } = useOutside(false);

  return (
    <div ref={ref} className={styles.selectText}>
      <Button
        onClick={(e) => {
          document.body.classList.add('lock');
          e.preventDefault();
          setIsShow(!isShow);
        }}
        className={'px-2 py-1'}
      >
        {title}
      </Button>
      {isShow && (
        <div className={styles.selectTextWrap}>
          <div ref={ref} className={styles.selectTextContent}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;

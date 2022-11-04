import { FC, PropsWithChildren } from 'react';

import Button from '@/ui/form-elements/Button';

import { useOutside } from '@/hooks/useOutside';

import styles from './SelectText.module.scss';

const Modal: FC<PropsWithChildren> = ({ children }) => {
  const { isShow, setIsShow, ref } = useOutside(false);

  return (
    <div ref={ref} className={styles.selectText}>
      <Button
        onClick={(e) => {
          e.preventDefault();
          setIsShow(!isShow);
        }}
        className={'px-2 py-1'}
      >
        Открыть модальное окно
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

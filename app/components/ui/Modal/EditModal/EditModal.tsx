import { FC, PropsWithChildren, useEffect, useRef } from 'react';

import { getKeys } from '@/utils/object/getKeys';

import styles from '../Modal.module.scss';

interface EditModalProps {
  item: any;
  openEdit: boolean;
  setOpenEdit: Function;
  setValue: Function;
}

const EditModal: FC<PropsWithChildren & EditModalProps> = ({
  children,
  item,
  openEdit,
  setOpenEdit,
  setValue
}) => {
  useEffect(() => {
    if (item) {
      getKeys(item).forEach((key: any) => {
        setValue(key, item[key]);
      });
    }
  }, [item]);

  //редактирование
  const ref = useRef<any>(null);
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpenEdit(false);
      return document.body.classList.remove('lock');
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div ref={ref} className={styles.selectText}>
      {openEdit && (
        <div className={styles.selectTextWrap}>
          <div ref={ref} className={styles.selectTextContent}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditModal;

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import Image from 'next/image';
import { FC } from 'react';

import styles from '@/ui/form-elements/form.module.scss';

import { useOutside } from '@/hooks/useOutside';

import emojiSmile from '@/assets/icons/emojiSmile.svg';

const EmojiMart: FC<any> = ({ onChange, value }: any) => {
  const { isShow, setIsShow, ref } = useOutside(false);

  return (
    <div className="emoji-picker">
      <div className={styles.icon} onClick={() => setIsShow((prev) => !prev)}>
        <Image src={emojiSmile} alt="icons" />
      </div>
      <div>
        {isShow && (
          <div ref={ref}>
            <Picker
              data={data}
              onEmojiSelect={(e: any) => onChange((value || '') + e.native)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiMart;

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import Image from 'next/image';
import { FC, useState } from 'react';

import styles from '@/ui/form-elements/form.module.scss';

import emojiSmile from '@/assets/icons/emojiSmile.svg';

const EmojiMart: FC<any> = ({ onChange, value }: any) => {
  const [isOpenIcons, setIsOpenIcons] = useState(false);

  return (
    <div className="emoji-picker">
      <div
        className={styles.icon}
        onClick={() => setIsOpenIcons((prev) => !prev)}
      >
        <Image src={emojiSmile} alt="icons" />
      </div>
      <div>
        {isOpenIcons && (
          <Picker
            data={data}
            onEmojiSelect={(e: any) => onChange((value || '') + e.native)}
          />
        )}
      </div>
    </div>
  );
};

export default EmojiMart;

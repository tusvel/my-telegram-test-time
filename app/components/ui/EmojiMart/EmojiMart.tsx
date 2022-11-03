import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import Image from 'next/image';
import { FC, useState } from 'react';

import styles from '@/ui/form-elements/form.module.scss';

import emojiSmile from '@/assets/icons/emojiSmile.svg';

const EmojiMart: FC<any> = ({ onChange, valueInput, changeForm }: any) => {
  const [isOpenIcons, setIsOpenIcons] = useState(false);

  const onSelectEmoji = (e: any) => {
    onChange((prev: any) => prev + e.native);
    changeForm(valueInput);
  };

  return (
    <div className="emoji-picker">
      <div
        className={styles.icon}
        onClick={() => setIsOpenIcons((prev) => !prev)}
      >
        <Image src={emojiSmile} alt="icons" />
      </div>
      <div>
        {isOpenIcons && <Picker data={data} onEmojiSelect={onSelectEmoji} />}
      </div>
    </div>
  );
};

export default EmojiMart;

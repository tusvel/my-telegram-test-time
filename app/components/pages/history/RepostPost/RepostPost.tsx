import Image from 'next/image';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { useRepostPost } from '@/pages/history/RepostPost/useRepostPost';
import { ITextInput } from '@/pages/texts/ITextInput';

import ChannelField from '@/components/shared/fields/ChannelField/ChannelField';

import Button from '@/ui/form-elements/Button';

import { useOutside } from '@/hooks/useOutside';

import { IText } from '@/shared/types/text.interface';

import repostImage from '@/assets/icons/repost.svg';

import styles from '../PostItem.module.scss';

const RepostPost: FC<{ item: IText }> = ({ item }) => {
  const { isShow, setIsShow, ref } = useOutside(false);
  const { handleSubmit, control } = useForm<ITextInput>({
    mode: 'onChange'
  });
  const { onEditSubmit } = useRepostPost(item);

  return (
    <>
      <div
        onClick={() => setIsShow((prev) => !prev)}
        className={styles.repostImage}
      >
        <Image src={repostImage} alt="Repost" />
      </div>
      {isShow && (
        <div className={styles.selectTextWrap}>
          <div ref={ref} className={styles.selectTextContent}>
            <form onSubmit={handleSubmit(onEditSubmit)}>
              <div className="mb-[100px]">
                <ChannelField isMulti={true} control={control} name="channel" />
              </div>
              <Button className="absolute bottom-5 right-5">Репост</Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RepostPost;

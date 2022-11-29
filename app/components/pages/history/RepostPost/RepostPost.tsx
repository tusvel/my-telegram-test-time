import Image from 'next/image';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { useRepostPost } from '@/pages/history/RepostPost/useRepostPost';

import ChannelField from '@/components/shared/fields/ChannelField/ChannelField';

import Button from '@/ui/form-elements/Button';

import { useOutside } from '@/hooks/useOutside';

import { IPostTextResponse } from '@/shared/types/post-text/post-text-response.interface';
import { IPostResponse } from '@/shared/types/post/post-response.interface';

import repostImage from '@/assets/icons/repost.svg';

import styles from '../PostItem.module.scss';

const RepostPost: FC<{ item: IPostResponse }> = ({ item }) => {
  const { isShow, setIsShow, ref } = useOutside(false);
  const { handleSubmit, control } = useForm<IPostTextResponse>({
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

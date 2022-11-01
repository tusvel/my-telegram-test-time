import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { IPostInput } from '@/pages/home/CreatePost/create-post.interface';
import { useCreatePost } from '@/pages/home/CreatePost/useCreatePost';

import { useTypedSelector } from '@/hooks/useTypedSelector';

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});
const DynamicTextEditor = dynamic(
  () => import('@/ui/form-elements/TextEditor'),
  {
    ssr: false
  }
);
const CreatePost: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control
  } = useForm<IPostInput>({
    mode: 'onChange'
  });
  const { onSubmit } = useCreatePost();
  const { items: chanelItems, isLoading } = useTypedSelector(
    (state) => state.channel
  );
  const optionsItems = chanelItems?.map((item) => ({
    value: item.id,
    label: item.title
  }));

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="channel"
          render={({ field, fieldState: { error } }) => (
            <DynamicSelect
              field={field}
              options={optionsItems || []}
              isLoading={isLoading}
              isMulti={false}
              placeholder="Выберите канал:"
              error={error}
            />
          )}
        />
        <Controller
          control={control}
          name="text"
          defaultValue=""
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DynamicTextEditor
              onChange={onChange}
              value={value}
              error={error}
              placeholder="Text"
            />
          )}
        />
      </form>
    </div>
  );
};

export default CreatePost;

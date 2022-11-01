import dynamic from 'next/dynamic';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { IPostInput } from '@/pages/home/CreatePost/create-post.interface';
import { useCreatePost } from '@/pages/home/CreatePost/useCreatePost';

import Button from '@/ui/form-elements/Button';
import Field from '@/ui/form-elements/Field';
import Toggle from '@/ui/form-elements/Toggle';

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
  const [hasButton, setHasButton] = useState();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    reset
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
        <div className="mb-5">
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
        </div>
        <div className="mb-5">
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
        </div>
        <div className="mb-5">
          <div>Наличие кнопки</div>
          <Controller
            control={control}
            name="has_button"
            defaultValue={false}
            render={({ field: { value, onChange } }) => (
              <Toggle
                setHasButton={setHasButton}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>
        {hasButton && (
          <div>
            <div>
              <Field
                {...register('text_button')}
                placeholder="Текст кнопки"
                error={errors.text_button}
                style={{ width: '300px' }}
              />
            </div>
            <div>
              <Field
                {...register('button_url')}
                placeholder="Ссылка кнопки"
                error={errors.text_button}
                style={{ width: '300px' }}
              />
            </div>
          </div>
        )}
        <Button
          onClick={() => reset()}
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;

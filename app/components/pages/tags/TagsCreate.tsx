import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import VerticalField from '@/components/shared/fields/VerticalField/VerticalField';

import Modal from '@/ui/Modal/Modal';
import Button from '@/ui/form-elements/Button';
import Toggle from '@/ui/form-elements/Toggle';

import { useActions } from '@/hooks/useActions';
import { useAppDispatch } from '@/hooks/useAppDispatch';

import { ITagCreateRequest } from '@/shared/types/tag/tag-create.interface';

import { TagService } from '@/services/tag/tag.service';

import { addTag } from '@/store/tag/tag.slice';

const TagsCreate: FC = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<ITagCreateRequest>({
    mode: 'onChange'
  });
  const { getAllTags } = useActions();

  const onSubmit: SubmitHandler<ITagCreateRequest> = async (data) => {
    try {
      const tag = await TagService.create(data);
      dispatch(addTag(tag));
      setValue('value', '');
      setValue('description', '');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal title="Добавить тег">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-7 flex">
          <input
            {...register('value', { required: 'Укажите текст тега' })}
            type="text"
            placeholder="Текст тега"
            className="mr-5"
          />
          <input
            {...register('description', { required: 'Укажите текст тега' })}
            type="text"
            placeholder="Описание тега"
          />
        </div>
        <VerticalField
          className="mr-5"
          control={control}
          name="vertical"
          isRequired
        />
        <div className="my-2">
          <div>Тег - особенный?</div>
          <Controller
            control={control}
            name="is_special"
            defaultValue={false}
            render={({ field: { value, onChange } }) => (
              <Toggle value={value} onChange={onChange} />
            )}
          />
        </div>
        <Button>Создать тег</Button>
      </form>
    </Modal>
  );
};

export default TagsCreate;

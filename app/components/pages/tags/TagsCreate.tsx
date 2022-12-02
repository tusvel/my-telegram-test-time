import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import VerticalField from '@/components/shared/fields/VerticalField/VerticalField';

import Modal from '@/ui/Modal/Modal';
import Button from '@/ui/form-elements/Button';

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
      const tag = await TagService.create({ ...data, is_special: false });
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
        <div className="my-5 flex">
          <input
            {...register('value', { required: 'Укажите текст тега' })}
            type="text"
            placeholder="Название тега"
            className="mr-5"
          />
          <VerticalField
            className="mr-5"
            control={control}
            name="vertical"
            isRequired
          />
        </div>
        <div className="flex flex-col">
          <textarea
            {...register('description', { required: 'Укажите текст тега' })}
            className="h-[100px] w-[300px]"
            placeholder="Описание тега"
          />
          <Button className="mt-5">Создать тег</Button>
        </div>
      </form>
    </Modal>
  );
};

export default TagsCreate;

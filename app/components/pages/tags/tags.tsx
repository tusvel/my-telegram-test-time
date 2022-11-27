import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import VerticalField from '@/components/shared/fields/VerticalField/VerticalField';

import ListItem from '@/ui/List/ListItem/ListItem';
import Modal from '@/ui/Modal/Modal';
import Button from '@/ui/form-elements/Button';
import Toggle from '@/ui/form-elements/Toggle';

import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { ITagCreateRequest } from '@/shared/types/tag/tag-create.interface';

import { TagService } from '@/services/tag/tag.service';

const Tags: FC = () => {
  const { items } = useTypedSelector((state) => state.tag);
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
    await TagService.create(data);
    getAllTags();
    setValue('value', '');
    setValue('description', '');
  };

  return (
    <div>
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
      <ul role="list" className="space-y-3 mt-5">
        {Array.isArray(items) &&
          items.map((item) => (
            <div key={item.id}>
              <ListItem
                item={{
                  tags: [item],
                  text: item.description,
                  vertical: item.vertical
                }}
              />
            </div>
          ))}
      </ul>
    </div>
  );
};

export default Tags;

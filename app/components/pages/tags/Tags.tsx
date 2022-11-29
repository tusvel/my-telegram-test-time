import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import TagsCreate from '@/pages/tags/TagsCreate';

import ListItem from '@/ui/List/ListItem/ListItem';
import EditModal from '@/ui/Modal/EditModal/EditModal';
import Button from '@/ui/form-elements/Button';
import Toggle from '@/ui/form-elements/Toggle';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { ITagResponse } from '@/shared/types/tag/tag-response.interface';

import { TagService } from '@/services/tag/tag.service';

import { removeTag } from '@/store/tag/tag.slice';

const Tags: FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useTypedSelector((state) => state.tag);
  const { setValue, register, handleSubmit, control } = useForm<ITagResponse>({
    mode: 'onChange'
  });

  //action
  const [editItem, setEditItem] = useState<ITagResponse>();
  const [openEdit, setOpenEdit] = useState(false);

  const remove = async (item: ITagResponse) => {
    try {
      await TagService.deleteOne(item.id);
      dispatch(removeTag(item));
    } catch (e) {
      console.log(e);
    }
  };
  const edit = (item: ITagResponse) => {
    setOpenEdit(true);
    setEditItem(item);
  };

  const onSubmit: SubmitHandler<ITagResponse> = async (data) => {
    await TagService.update({
      tag_id: data.id,
      description: data.description,
      is_special: data.is_special
    });
  };

  return (
    <div>
      <TagsCreate />
      <ul role="list" className="space-y-3 mt-5">
        {Array.isArray(items) &&
          items.map((item) => (
            <div key={item.id}>
              <ListItem
                style={{ width: 400 }}
                remove={remove}
                edit={edit}
                item={{
                  id: item.id,
                  tags: [item],
                  description: item.description,
                  vertical: item.vertical,
                  is_special: item.is_special
                }}
              />
            </div>
          ))}
      </ul>
      <EditModal
        setValue={setValue}
        setOpenEdit={setOpenEdit}
        openEdit={openEdit}
        item={editItem}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('description', { required: 'Укажите текст тега' })}
            type="text"
            placeholder="Описание тега"
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
          <Button>Обновить</Button>
        </form>
      </EditModal>
    </div>
  );
};

export default Tags;

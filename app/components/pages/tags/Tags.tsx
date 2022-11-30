import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import TagItem from '@/pages/tags/TagItem';
import TagsCreate from '@/pages/tags/TagsCreate';

import EditModal from '@/ui/Modal/EditModal/EditModal';
import Button from '@/ui/form-elements/Button';
import Toggle from '@/ui/form-elements/Toggle';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { ITagResponse } from '@/shared/types/tag/tag-response.interface';

import { TagService } from '@/services/tag/tag.service';

import { removeTag, updateTag } from '@/store/tag/tag.slice';

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
    dispatch(updateTag(data));
  };

  //filter
  const gamblingItems =
    items?.filter((item) => item.vertical === 'gambling') || [];
  const casinoItems = items?.filter((item) => item.vertical === 'casino') || [];
  const cryptoItems = items?.filter((item) => item.vertical === 'crypto') || [];

  return (
    <div>
      <TagsCreate />
      <div className="flex">
        <ul role="list" className="space-y-3 mt-5 mr-10">
          {Array.isArray(gamblingItems) &&
            gamblingItems.map((item) => (
              <div key={item.id}>
                <TagItem item={item} edit={edit} remove={remove} />
              </div>
            ))}
        </ul>
        <ul role="list" className="space-y-3 mt-5 mr-10">
          {Array.isArray(casinoItems) &&
            casinoItems.map((item) => (
              <div key={item.id}>
                <TagItem item={item} edit={edit} remove={remove} />
              </div>
            ))}
        </ul>
        <ul role="list" className="space-y-3 mt-5">
          {Array.isArray(cryptoItems) &&
            cryptoItems.map((item) => (
              <div key={item.id}>
                <TagItem item={item} edit={edit} remove={remove} />
              </div>
            ))}
        </ul>
      </div>
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

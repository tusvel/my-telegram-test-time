import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import TagItem from '@/pages/tags/TagItem';
import TagsCreate from '@/pages/tags/TagsCreate';

import EditModal from '@/ui/Modal/EditModal/EditModal';
import Button from '@/ui/form-elements/Button';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { ITagResponse } from '@/shared/types/tag/tag-response.interface';

import { TagService } from '@/services/tag/tag.service';

import { removeTag, updateTag } from '@/store/tag/tag.slice';
import MaterialIcon from "@/ui/MaterialIcon/MaterialIcon";
import cn from "classnames";
import styles from "@/ui/List/ListItem/ListItem.module.scss";

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
      is_special: false
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
          <span className="mb-5">Gambling</span>
          {Array.isArray(gamblingItems) &&
            gamblingItems.map((item) => (
              <div key={item.id} className={cn("relative", styles.item)}>
                <TagItem item={item}/>
                <div className={cn('absolute top-0 right-0 flex items-center', styles.editItems)}>
                  <div onClick={() => edit(item)} className="cursor-pointer w-6 h-6">
                    <MaterialIcon name="PencilSquareIcon" />
                  </div>
                  <div onClick={() => remove(item)} className="cursor-pointer w-6 h-6">
                    <MaterialIcon name="TrashIcon" />
                  </div>
                </div>
              </div>
            ))}
        </ul>
        <ul role="list" className="space-y-3 mt-5 mr-10">
          <span className="mb-5">Casino</span>
          {Array.isArray(casinoItems) &&
            casinoItems.map((item) => (
              <div key={item.id} className={cn("relative", styles.item)}>
                <TagItem item={item}/>
                <div className={cn('absolute top-0 right-0 flex items-center', styles.editItems)}>
                  <div onClick={() => edit(item)} className="cursor-pointer w-6 h-6">
                    <MaterialIcon name="PencilSquareIcon" />
                  </div>
                  <div onClick={() => remove(item)} className="cursor-pointer w-6 h-6">
                    <MaterialIcon name="TrashIcon" />
                  </div>
                </div>
              </div>
            ))}
        </ul>
        <ul role="list" className="space-y-3 mt-5">
          <span className="mb-5">Crypto</span>
          {Array.isArray(cryptoItems) &&
            cryptoItems.map((item) => (
              <div key={item.id} className={cn("relative", styles.item)}>
                <TagItem item={item}/>
                <div className={cn('absolute top-0 right-0 flex items-center', styles.editItems)}>
                  <div onClick={() => edit(item)} className="cursor-pointer w-6 h-6">
                    <MaterialIcon name="PencilSquareIcon" />
                  </div>
                  <div onClick={() => remove(item)} className="cursor-pointer w-6 h-6">
                    <MaterialIcon name="TrashIcon" />
                  </div>
                </div>
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
          <div className="flex flex-col">
            Описание тега
            <textarea
              {...register('description', { required: 'Укажите текст тега' })}
              className="h-[100px] w-[300px]"
              placeholder="Описание тега"
            />
            <Button className="mt-5">Обновить</Button>
          </div>
        </form>
      </EditModal>
    </div>
  );
};

export default Tags;

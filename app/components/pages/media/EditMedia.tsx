import React, {useState} from 'react';
import EditModal from "@/ui/Modal/EditModal/EditModal";
import Button from "@/ui/form-elements/Button";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {SubmitHandler, useForm} from "react-hook-form";
import {ITagResponse} from "@/shared/types/tag/tag-response.interface";
import {TagService} from "@/services/tag/tag.service";
import {removeTag, updateTag} from "@/store/tag/tag.slice";

const EditMedia = () => {
  const dispatch = useAppDispatch();
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

  return (
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
  );
};

export default EditMedia;
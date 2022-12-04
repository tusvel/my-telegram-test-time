import dynamic from 'next/dynamic';
import React, { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import CreateMedia from '@/pages/media/CreateMedia';
import MediaContent from '@/pages/media/MediaContent';

import ChannelField from '@/components/shared/fields/ChannelField/ChannelField';
import VerticalField from '@/components/shared/fields/VerticalField/VerticalField';

import EditModal from '@/ui/Modal/EditModal/EditModal';
import Button from '@/ui/form-elements/Button';
import { IOption } from '@/ui/select/select.interface';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { LanguageType } from '@/shared/types/language/language.type';
import { IMediaResponse } from '@/shared/types/media/media-response.interface';

import { MediaService } from '@/services/media/media.service';
import { TagService } from '@/services/tag/tag.service';

import { convertSelect } from '@/utils/convertSelect';
import Meta from '@/utils/meta/Meta';

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});
const Media: FC = () => {
  const { items: tagItems } = useTypedSelector((state) => state.tag);
  const selectTags = convertSelect(tagItems, 'value', 'id');

  const dispatch = useAppDispatch();
  const { setValue, handleSubmit, control } = useForm<IMediaResponse>({
    mode: 'onChange'
  });

  //action
  const [editItem, setEditItem] = useState<IMediaResponse>();
  const [openEdit, setOpenEdit] = useState(false);

  const remove = async (item: IMediaResponse) => {
    try {
      await TagService.deleteOne(item.id);
      // dispatch(removeMedia(item));
    } catch (e) {
      console.log(e);
    }
  };
  const edit = (item: IMediaResponse) => {
    setOpenEdit(true);
    setEditItem(item);
  };

  const onSubmit: SubmitHandler<IMediaResponse> = async (data) => {
    console.log(data);
    const tags = data.tags.map((item) => item.id);
    await MediaService.update({
      id: data.id,
      channel_id: data.channel.id,
      language: data.language,
      tag_ids: tags,
      vertical: data.vertical
    });
    // dispatch(updateMedia(data));
  };
  return (
    <Meta title="Media" description="Media in telegram">
      <CreateMedia />
      <MediaContent edit={edit} remove={remove} />
      <EditModal
        setValue={setValue}
        setOpenEdit={setOpenEdit}
        openEdit={openEdit}
        item={editItem}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <div className="my-5 flex items-center">
              <div className="mr-5">
                <Controller
                  control={control}
                  name="tags"
                  render={({ field, fieldState: { error } }) => (
                    <DynamicSelect
                      field={field}
                      options={selectTags || []}
                      isMulti={true}
                      placeholder="Выбрать теги"
                      error={error}
                      classNamePrefix="media-select"
                    />
                  )}
                />
              </div>
              <Controller
                control={control}
                name="language"
                render={({ field, fieldState: { error } }) => (
                  <DynamicSelect
                    field={field}
                    options={
                      ([
                        { label: 'ru', value: 'ru' },
                        { label: 'en', value: 'en' },
                        { label: 'es', value: 'es' }
                      ] as { label: LanguageType; value: LanguageType }[]) || []
                    }
                    isMulti={false}
                    placeholder="Выбрать язык"
                    error={error}
                    classNamePrefix="media-select"
                  />
                )}
              />
            </div>
            <div className="mt-7 mb-3 flex items-center">
              <Controller
                control={control}
                name="type"
                render={({ field, fieldState: { error } }) => (
                  <DynamicSelect
                    field={field}
                    options={
                      ([
                        { label: 'photo', value: 'photo' },
                        { label: 'voice', value: 'voice' },
                        { label: 'video', value: 'video' },
                        { label: 'videoNote', value: 'videoNote' }
                      ] as IOption[]) || []
                    }
                    isMulti={false}
                    placeholder="Выбрать тип"
                    error={error}
                    classNamePrefix="media-select"
                  />
                )}
              />
              <ChannelField
                className="ml-5"
                control={control}
                name="channel_id"
              />
            </div>
            <VerticalField
              className="my-5"
              control={control}
              name="vertical"
              isRequired
            />
            <Button className="mt-5">Обновить</Button>
          </div>
        </form>
      </EditModal>
    </Meta>
  );
};

export default Media;

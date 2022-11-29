import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import ChannelItem from '@/pages/channels/ChannelItem/ChannelItem';
import ChannelsCreate from '@/pages/channels/ChannelsCreate';

import ButtonTextsInterval from '@/components/shared/fields/ButtonTextsInterval/ButtonTextsInterval';
import ContactField from '@/components/shared/fields/ContactField/ContactField';

import EditModal from '@/ui/Modal/EditModal/EditModal';
import Button from '@/ui/form-elements/Button';
import formStyles from '@/ui/form-elements/form.module.scss';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { IChannelResponse } from '@/shared/types/channel/channel-response.interface';

import { ChannelSlotService } from '@/services/channel-slot/channel-slot.service';
import { ChannelService } from '@/services/channel/channel.service';

import Meta from '@/utils/meta/Meta';

import { removeChannel } from '@/store/channel/channel.slice';

const Channels: FC = () => {
  const { items } = useTypedSelector((state) => state.channel);
  const dispatch = useAppDispatch();

  const remove = async (item: IChannelResponse) => {
    try {
      item.channel_slot.map(async (item) => {
        await ChannelSlotService.deleteOne(item.id);
      });
      await ChannelService.deleteOne(item.id);
      dispatch(removeChannel(item));
    } catch (e) {
      console.log(e);
    }
  };

  //edit
  const [itemsButton, setItemsButton] = useState({});
  const {
    setValue,
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm<IChannelResponse>({
    mode: 'onChange'
  });
  const [editItem, setEditItem] = useState<IChannelResponse>();
  const [openEdit, setOpenEdit] = useState(false);
  const editAction = async (item: IChannelResponse) => {
    setOpenEdit(true);
    await setEditItem(item);
    editItem?.button_texts.map(async (item, index) => {
      await setItemsButton((prev) => ({ ...prev, [index]: item }));
    });
  };
  const onSubmit: SubmitHandler<IChannelResponse> = async (data) => {
    const arrBtn = Object.values(itemsButton) as string[];
    await ChannelService.update({
      id: data.id,
      button_texts: arrBtn,
      contact: data.contact
    });
  };

  useEffect(() => {
    editItem?.button_texts.map(async (item, index) => {
      await setItemsButton((prev) => ({ ...prev, [index]: item }));
    });
  }, [editItem]);

  return (
    <Meta title="Channels" description="Channels in telegram">
      <ChannelsCreate />
      {items && items?.length > 0 && (
        <ul role="list" className="space-y-3 mt-5">
          {items?.length &&
            items.map((item) => (
              <ChannelItem
                edit={editAction}
                remove={remove}
                key={item.id}
                item={item}
              />
            ))}
        </ul>
      )}
      <EditModal
        setValue={setValue}
        setOpenEdit={setOpenEdit}
        openEdit={openEdit}
        item={editItem}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ContactField
            default_value={editItem?.contact}
            {...register('contact', {
              required: 'Введите контакты'
            })}
          />
          <div className="flex mt-3">
            <div className="relative">
              <ButtonTextsInterval
                setItems={setItemsButton}
                items={itemsButton}
              />
              {errors.button_texts && (
                <span className={formStyles.error}>
                  {errors.button_texts.message}
                </span>
              )}
            </div>
          </div>
          <Button>Обновить</Button>
        </form>
      </EditModal>
    </Meta>
  );
};

export default Channels;

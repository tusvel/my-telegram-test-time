import { FC, useState } from 'react';
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

import { removeChannel, updateChannel } from '@/store/channel/channel.slice';

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
    formState: { errors }
  } = useForm<IChannelResponse>({
    mode: 'onChange'
  });
  const [editItem, setEditItem] = useState<IChannelResponse>();
  const [openEdit, setOpenEdit] = useState(false);
  const editAction = async (item: IChannelResponse) => {
    await setEditItem(item);
    await setItemsButton({});
    item?.button_texts.map(async (item, index) => {
      await setItemsButton((prev) => ({ ...prev, [index]: item }));
    });
    setOpenEdit(true);
    console.log(itemsButton);
  };
  const onSubmit: SubmitHandler<IChannelResponse> = async (data) => {
    const arrBtn = Object.values(itemsButton) as string[];
    await ChannelService.update({
      id: data.id,
      button_texts: arrBtn,
      contact: data.contact
    });
    data.button_texts = arrBtn;
    dispatch(updateChannel(data));
  };

  const gamblingItems =
    items?.filter((item) => item.vertical === 'gambling') || [];
  const casinoItems = items?.filter((item) => item.vertical === 'casino') || [];
  const cryptoItems = items?.filter((item) => item.vertical === 'crypto') || [];

  return (
    <Meta title="Channels" description="Channels in telegram">
      <ChannelsCreate />
      <div className="flex">
        {gamblingItems && gamblingItems?.length > 0 && (
          <ul role="list" className="space-y-3 mt-5 mr-10">
            {gamblingItems?.length &&
              gamblingItems.map((item) => (
                <ChannelItem
                  edit={editAction}
                  remove={remove}
                  key={item.id}
                  item={item}
                />
              ))}
          </ul>
        )}
        {casinoItems && casinoItems?.length > 0 && (
          <ul role="list" className="space-y-3 mt-5 mr-10">
            {casinoItems?.length &&
              casinoItems.map((item) => (
                <ChannelItem
                  edit={editAction}
                  remove={remove}
                  key={item.id}
                  item={item}
                />
              ))}
          </ul>
        )}
        {cryptoItems && cryptoItems?.length > 0 && (
          <ul role="list" className="space-y-3 mt-5">
            {cryptoItems?.length &&
              cryptoItems.map((item) => (
                <ChannelItem
                  edit={editAction}
                  remove={remove}
                  key={item.id}
                  item={item}
                />
              ))}
          </ul>
        )}
      </div>
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

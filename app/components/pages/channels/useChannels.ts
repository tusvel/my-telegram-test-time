import { SubmitHandler } from 'react-hook-form';

import { useAppDispatch } from '@/hooks/useAppDispatch';

import { IChannelCreateRequest } from '@/shared/types/channel/channel-create.interface';

import { ChannelSlotService } from '@/services/channel-slot/channel-slot.service';
import { ChannelService } from '@/services/channel/channel.service';
import { MediaService } from '@/services/media/media.service';

import { addChannel } from '@/store/channel/channel.slice';

export const useCreateChannel: any = (timeItems: any, itemsButton: any) => {
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<IChannelCreateRequest> = async (data) => {
    data.profile_picture.map(async (item: Blob) => {
      const formData = new FormData();
      formData.append('file', item);
      const picture = await MediaService.upload(formData);
      const arrayButton = Object.keys(itemsButton).map(
        (key) => itemsButton[key]
      );
      const channel = await ChannelService.create({
        ...data,
        profile_picture: picture.path,
        button_texts: arrayButton
      });
      await (timeItems &&
        Object.keys(timeItems).map(async (key) => {
          await ChannelSlotService.create({
            channel_id: channel.id,
            button_enabled: data.button_enabled,
            tags: data.tags,
            time_start: timeItems[key][0],
            time_end: timeItems[key][1]
          });
        }));
      dispatch(addChannel(channel));
    });
  };

  return { onSubmit };
};

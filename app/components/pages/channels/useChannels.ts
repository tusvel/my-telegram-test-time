import { SubmitHandler } from 'react-hook-form';

import { IChannelCreateRequest } from '@/shared/types/channel/channel-create.interface';

import { ChannelSlotService } from '@/services/channel-slot/channel-slot.service';
import { ChannelService } from '@/services/channel/channel.service';
import { MediaService } from '@/services/media/media.service';

export const useCreateChannel: any = (timeItems: any) => {
  const onSubmit: SubmitHandler<IChannelCreateRequest> = async (data) => {
    let picture_url;
    {
      data.profice_picture.map(async (item: Blob) => {
        const formData = new FormData();
        formData.append('file', item);
        picture_url = await MediaService.upload(formData);
      });
    }

    const channel = await ChannelService.create({
      ...data,
      profice_picture: picture_url
    });

    {
      timeItems &&
        Object.keys(timeItems).map(async (key) => {
          await ChannelSlotService.create({
            channel_id: channel.id,
            button_enabled: data.button_enabled,
            tags: data.tags,
            interval: `${timeItems[key][0]}-${timeItems[key][0]}`
          });
        });
    }
  };

  return { onSubmit };
};

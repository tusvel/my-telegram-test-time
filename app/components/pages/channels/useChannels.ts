import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { IChannelInput } from '@/pages/channels/IChannelInput';

import { ChannelService } from '@/services/channel/channel.service';

export const useCreateChannel: any = () => {
  const { mutateAsync } = useMutation('Create channel', (data: IChannelInput) =>
    ChannelService.create(data)
  );

  const onSubmit: SubmitHandler<IChannelInput> = async (data) => {
    console.log(data);
    await mutateAsync(data);
  };

  return { onSubmit };
};

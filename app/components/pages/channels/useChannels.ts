import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { IChannel } from '@/shared/types/channel.interface';

import { ChannelService } from '@/services/channel.service';

export const useCreateChannel: any = () => {
  const { mutateAsync } = useMutation('Create channel', (data: IChannel) =>
    ChannelService.create(data)
  );

  const onSubmit: SubmitHandler<IChannel> = async (data) => {
    console.log(data);
    await mutateAsync(data);
  };

  return { onSubmit };
};

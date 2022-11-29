import { FC } from 'react';
import { Control } from 'react-hook-form';

import { ITextCreate } from '@/pages/texts/text.interface';

import ChannelField from '@/components/shared/fields/ChannelField/ChannelField';
import LangField from '@/components/shared/fields/LangField/LangField';
import VerticalField from '@/components/shared/fields/VerticalField/VerticalField';

const TextFields: FC<{ control: Control<ITextCreate> }> = ({ control }) => {
  return (
    <div>
      <div className="flex items-center mt-3 mb-8">
        <ChannelField className="mr-5" control={control} name="channel_id" />
        <VerticalField
          isRequired
          className="mr-5"
          control={control}
          name="vertical"
        />
      </div>
      <div className="mb-11 flex items-center">
        <LangField isRequired control={control} name="language" />
      </div>
    </div>
  );
};

export default TextFields;

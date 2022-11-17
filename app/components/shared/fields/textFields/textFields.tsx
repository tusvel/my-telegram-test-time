import { FC } from 'react';
import { Control } from 'react-hook-form';

import { ITextInput } from '@/pages/texts/ITextInput';

import CategoryField from '@/components/shared/fields/CategoryField/CategoryField';
import ChannelField from '@/components/shared/fields/ChannelField/ChannelField';
import LangField from '@/components/shared/fields/LangField/LangField';

const TextFields: FC<{ control: Control<ITextInput> }> = ({ control }) => {
  return (
    <div>
      <div className="flex items-center mt-3 mb-8">
        <ChannelField className="mr-5" control={control} name="channel" />
        <CategoryField
          isRequired
          className="mr-5"
          control={control}
          name="categories"
        />
      </div>
      <div className="mb-11 flex items-center">
        <LangField isRequired control={control} name="language" />
      </div>
    </div>
  );
};

export default TextFields;

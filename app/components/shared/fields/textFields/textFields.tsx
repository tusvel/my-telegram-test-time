import { FC } from 'react';
import { Control } from 'react-hook-form';

import { ITextInput } from '@/pages/texts/ITextInput';

import CategoryField from '@/components/shared/fields/CategoryField/CategoryField';
import ChannelField from '@/components/shared/fields/ChannelField/ChannelField';
import LangField from '@/components/shared/fields/LangField/LangField';

const TextFields: FC<{ control: Control<ITextInput> }> = ({ control }) => {
  return (
    <div>
      <div className="flex items-center my-5">
        <ChannelField className="mr-5" control={control} name="channel" />
        <CategoryField className="mr-5" control={control} name="categories" />
      </div>
      <div className="mb-5 flex items-center">
        <LangField control={control} name="language" />
      </div>
    </div>
  );
};

export default TextFields;

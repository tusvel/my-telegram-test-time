import { FC } from 'react';
import ReactSelect, { OnChangeValue } from 'react-select';
import makeAnimated from 'react-select/animated';

import formStyles from '@/ui/form-elements/form.module.scss';
import { IOption, ISelect } from '@/ui/select/select.interface';

const animatedComponents = makeAnimated();

const Select: FC<ISelect> = ({
  error,
  field,
  isMulti,
  options,
  placeholder,
  isLoading,
  classNamePrefix = 'custom-select',
  formatOptionLabel
}) => {
  const onChange = (newValue: unknown | OnChangeValue<IOption, boolean>) => {
    if (newValue === null) {
      return field.onChange('');
    }
    field.onChange(
      isMulti
        ? (newValue as IOption[]).map((item) => item.value)
        : (newValue as IOption).value
    );
  };

  const getValue = () => {
    if (field.value) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : '';
    }
  };

  return (
    <div className="relative">
      <label>
        <span className={formStyles.placeholder}>{placeholder}</span>
        <ReactSelect
          classNamePrefix={classNamePrefix}
          options={options}
          value={getValue()}
          isMulti={isMulti}
          onChange={onChange}
          components={animatedComponents}
          formatOptionLabel={formatOptionLabel}
          isLoading={isLoading}
          isClearable
        />
      </label>
      {error && <div className={formStyles.error}>{error.message}</div>}
    </div>
  );
};

export default Select;

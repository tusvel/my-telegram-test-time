import dynamic from 'next/dynamic';
import { FC, useEffect, useState } from 'react';
import ReactSelect, { OnChangeValue } from 'react-select';

import { IOption } from '@/ui/select/select.interface';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { convertSelect } from '@/utils/convertSelect';

const defaultTimes = [
  ['08:00', '09:00'],
  ['15:00', '16:00'],
  ['19:00', '20:00']
];
const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});

const IntervalInputItem: FC<any> = ({
  itemsTime,
  keyItem,
  deleteTimeItem,
  setItemsTime
}) => {
  const { items: tagItems } = useTypedSelector((state) => state.tag);
  const selectTags = convertSelect(tagItems, 'value', 'id') || [];

  const [first, setFirst] = useState(
    defaultTimes[keyItem] ? defaultTimes[keyItem][0] : '10:00'
  );
  const [second, setSecond] = useState(
    defaultTimes[keyItem] ? defaultTimes[keyItem][1] : '11:00'
  );

  useEffect(() => {
    setFirst(defaultTimes[keyItem] ? defaultTimes[keyItem][0] : '10:00');
    setSecond(defaultTimes[keyItem] ? defaultTimes[keyItem][1] : '11:00');
  }, [keyItem]);

  //Tags
  const onChange = (newValue: unknown | OnChangeValue<IOption, boolean>) => {
    if (newValue === null) {
      return setItemsTime({
        ...itemsTime,
        [keyItem]: [[first, second], []]
      });
    }
    const prev = itemsTime[keyItem][1];
    const values = (newValue as IOption[]).map((item) => item.value);
    setItemsTime({
      ...itemsTime,
      [keyItem]: [
        [first, second],
        [...prev, ...values]
      ]
    });
  };

  return (
    <div className="flex items-center">
      <div
        className="h-10 w-10 flex items-center justify-center bg-white mr-3 cursor-pointer"
        onClick={() => deleteTimeItem(keyItem)}
      >
        ×
      </div>
      <div className="flex items-center">
        <input
          type="time"
          value={first}
          onChange={(e) => {
            setFirst(e.target.value);
            return setItemsTime({
              ...itemsTime,
              [keyItem]: [[first, second], []]
            });
          }}
        />
        <div className="mx-1">-</div>
        <input
          type="time"
          value={second}
          onChange={(e) => {
            setSecond(e.target.value);
            return setItemsTime({
              ...itemsTime,
              [keyItem]: [[first, second], []]
            });
          }}
        />
        <div className="ml-5">
          <ReactSelect
            classNamePrefix="custom-select"
            options={selectTags}
            isMulti={true}
            onChange={onChange}
            isClearable
          />
        </div>
      </div>
    </div>
  );
};

export default IntervalInputItem;

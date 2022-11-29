import { FC, useEffect, useState } from 'react';

const defaultTimes = [
  ['08:00', '09:00'],
  ['15:00', '16:00'],
  ['19:00', '20:00']
];

const IntervalInputItem: FC<any> = ({
  itemsTime,
  keyItem,
  deleteTimeItem,
  setItemsTime
}) => {
  const [first, setFirst] = useState(
    defaultTimes[keyItem] ? defaultTimes[keyItem][0] : ''
  );
  const [second, setSecond] = useState(
    defaultTimes[keyItem] ? defaultTimes[keyItem][1] : ''
  );

  useEffect(() => {
    setFirst(defaultTimes[keyItem] ? defaultTimes[keyItem][0] : '');
    setSecond(defaultTimes[keyItem] ? defaultTimes[keyItem][1] : '');
  }, [keyItem]);

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
              [keyItem]: [first, second]
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
              [keyItem]: [first, second]
            });
          }}
        />
      </div>
    </div>
  );
};

export default IntervalInputItem;

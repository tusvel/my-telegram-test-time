import { FC } from 'react';

import IntervalInputItem from '@/components/shared/fields/IntervalInput/IntervalInputItem';

let lastNumber = 2;

const IntervalInput: FC<any> = ({ setItemsTime, itemsTime }) => {
  const addTimeItem = async () => {
    lastNumber = 1 + lastNumber;
    await setItemsTime({ ...itemsTime, [lastNumber]: ['', ''] });
  };

  const deleteTimeItem = async (keyItem: number) => {
    const filtered = itemsTime;
    delete filtered[keyItem];
    setItemsTime({ ...filtered });
  };

  return (
    <div>
      <div
        className="mb-3 h-10 w-10 flex items-center justify-center bg-white mr-3 cursor-pointer"
        onClick={addTimeItem}
      >
        +
      </div>
      {Object.keys(itemsTime).map((keyItem) => (
        <div className="mb-3">
          <IntervalInputItem
            itemsTime={itemsTime}
            setItemsTime={setItemsTime}
            keyItem={keyItem}
            deleteTimeItem={deleteTimeItem}
          />
        </div>
      ))}
    </div>
  );
};

export default IntervalInput;

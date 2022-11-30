import { FC } from 'react';

import ButtonTextsIntervalItem from '@/components/shared/fields/ButtonTextsInterval/ButtonTextsIntervalItem';

const ButtonTextsInterval: FC<any> = ({ setItems, items }) => {
  const addTimeItem = () => {
    const itemsElem = Object.keys(items);
    const lastIndex = +(itemsElem.pop() || 0);
    const lastNumber = lastIndex + 1;
    setItems({ ...items, [lastNumber]: '' });
  };

  const deleteItem = (keyItem: number) => {
    const filtered = items;
    delete filtered[keyItem];
    setItems({ ...filtered });
  };

  return (
    <div>
      <div
        className="mb-3 h-10 w-10 flex items-center justify-center bg-white mr-3 cursor-pointer"
        onClick={addTimeItem}
      >
        +
      </div>
      {Object.keys(items).map((keyItem) => (
        <div className="mb-3">
          <ButtonTextsIntervalItem
            items={items}
            setItems={setItems}
            keyItem={keyItem}
            deleteItem={deleteItem}
          />
        </div>
      ))}
    </div>
  );
};

export default ButtonTextsInterval;

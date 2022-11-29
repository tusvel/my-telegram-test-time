import { FC, useState } from 'react';

const defaultTimes = [];

const ButtonTextsIntervalItem: FC<any> = ({
  items,
  keyItem,
  deleteItem,
  setItems
}) => {
  const [first, setFirst] = useState(items[keyItem]);

  return (
    <div className="flex items-center">
      <div
        className="h-10 w-10 flex items-center justify-center bg-white mr-3 cursor-pointer"
        onClick={() => deleteItem(keyItem)}
      >
        × {keyItem}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={first}
          placeholder="Текст кнопки"
          onChange={(e) => {
            setFirst(e.target.value);
            return setItems({
              ...items,
              [keyItem]: first
            });
          }}
        />
      </div>
    </div>
  );
};

export default ButtonTextsIntervalItem;

import { FC } from 'react';

import TextItem from '@/pages/texts/TextItem/TextItem';

import Button from '@/ui/form-elements/Button';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import Meta from '@/utils/meta/Meta';

const Texts: FC = () => {
  const { items, isLoading } = useTypedSelector((state) => state.text);

  return (
    <Meta title="Texts" description="Texts in telegram">
      <div>
        <Button className="mb-5">Создать</Button>
        <ul role="list" className="space-y-3">
          {items?.length &&
            items.map((item) => (
              <div key={item.id}>
                <TextItem item={item} />
              </div>
            ))}
        </ul>
      </div>
    </Meta>
  );
};

export default Texts;

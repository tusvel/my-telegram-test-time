export const convertSelect = (items: any, label: string, value: string) => {
  return (
    items &&
    items.map((item: any) => ({
      label: item[label],
      value: item[value]
    }))
  );
};

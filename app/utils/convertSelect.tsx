export const convertSelect = (
  items: any,
  label: string,
  value: string,
  image?: string
) => {
  return (
    items &&
    items.map((item: any) => ({
      label: item[label],
      value: item[value],
      image: image ? item[image] : null
    }))
  );
};

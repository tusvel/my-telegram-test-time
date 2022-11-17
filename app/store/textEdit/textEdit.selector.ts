import { TypeRootState } from '@/store/store';

export const selectTextItemById = (id: number) => (state: TypeRootState) =>
  state.textEdit.items?.find((obj) => obj.id === id);

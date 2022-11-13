import { TypeRootState } from '@/store/store';

export const selectTextItemById = (id: string) => (state: TypeRootState) =>
  state.textEdit.items?.find((obj) => obj.id === id);

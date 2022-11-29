import { IUserResponse } from '@/shared/types/user/user-response.interface';

export interface IClientInitialState {
  clients: IUserResponse[] | null;
}

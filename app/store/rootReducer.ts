import { reducer as channelReducer } from './channel/channel.slice';
import { reducer as userReducer } from './user/user.slice';

export const reducers = {
  user: userReducer,
  channel: channelReducer
};

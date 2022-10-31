import * as channelActions from './channel/channel.actions';
import * as userActions from './user/user.actions';

export const allActions = {
  ...userActions,
  ...channelActions
};

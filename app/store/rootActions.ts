import * as channelActions from './channel/channel.actions';
import * as mediaActions from './media/media.actions';
import * as textActions from './text/text.actions';
import * as userActions from './user/user.actions';

export const allActions = {
  ...userActions,
  ...channelActions,
  ...textActions,
  ...mediaActions
};

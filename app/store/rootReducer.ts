import { reducer as channelReducer } from './channel/channel.slice';
import { reducer as clientReducer } from './client/client.slice';
import { reducer as mediaReducer } from './media/media.slice';
import { reducer as postReducer } from './post/post.slice';
import { reducer as tagReducer } from './tag/tag.slice';
import { reducer as textReducer } from './text/text.slice';
import { reducer as textEditReducer } from './textEdit/textEdit.slice';
import { reducer as userReducer } from './user/user.slice';

export const reducers = {
  user: userReducer,
  channel: channelReducer,
  text: textReducer,
  media: mediaReducer,
  tag: tagReducer,
  post: postReducer,
  client: clientReducer,
  textEdit: textEditReducer
};

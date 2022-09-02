import { authHandlers } from '@mocks/handlers/auth';
import { chatHandlers } from '@mocks/handlers/chat';
import { followingHandlers } from '@mocks/handlers/following';
import { giphyHandlers } from '@mocks/handlers/giphy';
import { imagesHandlers } from '@mocks/handlers/images';
import { notificationHandlers } from '@mocks/handlers/notification';
import { postsHandlers } from '@mocks/handlers/post';
import { reactionHandlers } from '@mocks/handlers/reactions';
import { socketHandlers } from '@mocks/handlers/socket';
import { userHandlers } from '@mocks/handlers/user';
import { setupServer } from 'msw/node';

// Setup requests interception using the given handlers
export const server = setupServer(
  ...authHandlers,
  ...userHandlers,
  ...notificationHandlers,
  ...giphyHandlers,
  ...postsHandlers,
  ...reactionHandlers,
  ...followingHandlers,
  ...chatHandlers,
  ...imagesHandlers,
  ...socketHandlers
);

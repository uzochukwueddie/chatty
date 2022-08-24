import { authHandlers } from '@mocks/handlers/auth';
import { giphyHandlers } from '@mocks/handlers/giphy';
import { notificationHandlers } from '@mocks/handlers/notification';
import { postsHandlers } from '@mocks/handlers/post';
import { reactionHandlers } from '@mocks/handlers/reactions';
import { userHandlers } from '@mocks/handlers/user';
import { setupServer } from 'msw/node';

// Setup requests interception using the given handlers
export const server = setupServer(
  ...authHandlers,
  ...userHandlers,
  ...notificationHandlers,
  ...giphyHandlers,
  ...postsHandlers,
  ...reactionHandlers
);

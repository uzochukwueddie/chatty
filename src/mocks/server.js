import { authHandlers } from '@mocks/handlers/auth';
import { notificationHandlers } from '@mocks/handlers/notification';
import { userHandlers } from '@mocks/handlers/user';
import { setupServer } from 'msw/node';

// Setup requests interception using the given handlers
export const server = setupServer(...authHandlers, ...userHandlers, ...notificationHandlers);

import { authHandlers } from '@mocks/handlers/auth';
import { setupServer } from 'msw/node';

// Setup requests interception using the given handlers
export const server = setupServer(...authHandlers);

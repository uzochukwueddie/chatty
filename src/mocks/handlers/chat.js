import { messageData } from '@mocks/data/chat.mock';
import { BASE_ENDPOINT } from '@services/axios';
import { rest } from 'msw';

const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

export const emptyChatListMock = rest.get(`${BASE_URL}/chat/message/conversation-list`, (req, res, ctx) => {
  const result = { message: 'User conversation list', list: [] };
  return res(ctx.status(200), ctx.json(result));
});

export const chatListMock = rest.get(`${BASE_URL}/chat/message/conversation-list`, (req, res, ctx) => {
  const result = { message: 'User conversation list', list: [messageData] };
  return res(ctx.status(200), ctx.json(result));
});

export const chatMessagesMock = rest.get(`${BASE_URL}/chat/message/user/123456`, (req, res, ctx) => {
  const result = { message: 'User chat messages', messages: [messageData, messageData] };
  return res(ctx.status(200), ctx.json(result));
});

export const chatMessagesUserTwoMock = rest.get(`${BASE_URL}/chat/message/user/222222`, (req, res, ctx) => {
  const result = { message: 'User chat messages', messages: [messageData, messageData] };
  return res(ctx.status(200), ctx.json(result));
});

export const addChatUsersMock = rest.post(`${BASE_URL}/chat/message/add-chat-users`, (req, res, ctx) => {
  const result = { message: 'Users added' };
  return res(ctx.status(200), ctx.json(result));
});

export const chatHandlers = [
  emptyChatListMock,
  chatListMock,
  chatMessagesMock,
  addChatUsersMock,
  chatMessagesUserTwoMock
];

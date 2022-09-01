import { notificationData } from '@mocks/data/notification.mock';
import { BASE_ENDPOINT } from '@services/axios';
import { rest } from 'msw';

const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

export const emptyNotificationsMock = rest.get(`${BASE_URL}/notifications`, (req, res, ctx) => {
  const result = { message: 'User notifications', notifications: [] };
  return res(ctx.status(200), ctx.json(result));
});

export const getUserNotificationsMock = rest.get(`${BASE_URL}/notifications`, (req, res, ctx) => {
  const result = { message: 'User notifications', notifications: [notificationData] };
  return res(ctx.status(200), ctx.json(result));
});

export const markNotificationMock = rest.put(`${BASE_URL}/notification/12345`, (req, res, ctx) => {
  const result = { message: 'Notification marked as read' };
  return res(ctx.status(200), ctx.json(result));
});

export const deleteNotificationMock = rest.delete(`${BASE_URL}/notification/12345`, (req, res, ctx) => {
  const result = { message: 'Notification deleted successfully' };
  return res(ctx.status(200), ctx.json(result));
});

export const notificationHandlers = [
  getUserNotificationsMock,
  emptyNotificationsMock,
  markNotificationMock,
  deleteNotificationMock
];

import { imageMock } from '@mocks/data/images.mock';
import { BASE_ENDPOINT } from '@services/axios';
import { rest } from 'msw';

const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

export const getUserImagesMock = rest.get(`${BASE_URL}/images/60263f14648fed5246e322d9`, (req, res, ctx) => {
  const result = { message: 'User images', images: [imageMock] };
  return res(ctx.status(200), ctx.json(result));
});

export const addUserImageMock = rest.post(`${BASE_URL}/images/profile`, (req, res, ctx) => {
  const result = { message: 'Image added successfully' };
  return res(ctx.status(200), ctx.json(result));
});

export const removeUserImageMock = rest.delete(`${BASE_URL}/images/`, (req, res, ctx) => {
  const result = { message: 'Image deleted successfully' };
  return res(ctx.status(200), ctx.json(result));
});

export const imagesHandlers = [getUserImagesMock, addUserImageMock, removeUserImageMock];

import { postMockData } from '@mocks/data/post.mock';
import { existingUser, existingUserThree, existingUserTwo } from '@mocks/data/user.mock';
import { BASE_ENDPOINT } from '@services/axios';
import { rest } from 'msw';

const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

export const getSuggestionsMock = rest.get(`${BASE_URL}/user/profile/user/suggestions`, (req, res, ctx) => {
  const result = { message: 'User suggestions', users: [existingUser] };
  return res(ctx.status(200), ctx.json(result));
});

export const getUserProfileByIdMock = rest.get(`${BASE_URL}/user/profile/123456`, (req, res, ctx) => {
  const result = { message: 'Get user profile', user: existingUser };
  return res(ctx.status(200), ctx.json(result));
});

export const getUserProfileByIdUserTwoMock = rest.get(
  `${BASE_URL}/user/profile/60263f14648fed5246e322d9`,
  (req, res, ctx) => {
    const result = { message: 'Get user profile', user: existingUserTwo };
    return res(ctx.status(200), ctx.json(result));
  }
);

export const getAllUsersMock = rest.get(`${BASE_URL}/user/all/1`, (req, res, ctx) => {
  const result = {
    message: 'Get users',
    users: [existingUserTwo, existingUserThree],
    followers: [existingUserThree],
    totalUsers: 2
  };
  return res(ctx.status(200), ctx.json(result));
});

export const emptyUsersMock = rest.get(`${BASE_URL}/user/all/1`, (req, res, ctx) => {
  const result = {
    message: 'Get users',
    users: [],
    followers: [],
    totalUsers: 0
  };
  return res(ctx.status(200), ctx.json(result));
});

export const getUserProfileByUsernameMock = rest.get(
  `${BASE_URL}/user/profile/posts/Manny/60263f14648fed5246e322d9/1621613119252066`,
  (req, res, ctx) => {
    const result = {
      message: 'Get user profile and posts',
      user: existingUser,
      posts: [postMockData]
    };
    return res(ctx.status(200), ctx.json(result));
  }
);

export const changePasswordMock = rest.put(`${BASE_URL}/user/profile/change-password`, (req, res, ctx) => {
  const result = {
    message: 'Password updated successfully. You will be redirected shortly to the login page'
  };
  return res(ctx.status(200), ctx.json(result));
});

export const userHandlers = [
  getSuggestionsMock,
  getUserProfileByIdMock,
  getUserProfileByIdUserTwoMock,
  getAllUsersMock,
  getUserProfileByUsernameMock,
  emptyUsersMock,
  changePasswordMock
];

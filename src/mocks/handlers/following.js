import { existingUserThree, existingUserTwo } from '@mocks/data/user.mock';
import { BASE_ENDPOINT } from '@services/axios';
import { rest } from 'msw';

const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

export const getUserFollowingMock = rest.get(`${BASE_URL}/user/following`, (req, res, ctx) => {
  const result = { message: 'User following', following: [existingUserTwo, existingUserThree] };
  return res(ctx.json(result));
});

export const emptyUserFollowingMock = rest.get(`${BASE_URL}/user/following`, (req, res, ctx) => {
  const result = { message: 'User following', following: [] };
  return res(ctx.json(result));
});

export const getUserFollowersMock = rest.get(`${BASE_URL}/user/followers/60263f14648fed5246e322d9`, (req, res, ctx) => {
  const result = { message: 'User followers', followers: [existingUserTwo, existingUserThree] };
  return res(ctx.json(result));
});

export const emptyUserFollowersMock = rest.get(
  `${BASE_URL}/user/followers/60263f14648fed5246e322d9`,
  (req, res, ctx) => {
    const result = { message: 'User followers', followers: [] };
    return res(ctx.json(result));
  }
);

export const followUserMock = rest.put(`${BASE_URL}/user/follow/60263f14648fed5246e322d8`, (req, res, ctx) => {
  const result = { message: 'Following user now' };
  return res(ctx.json(result));
});

export const unFollowUserMock = rest.put(
  `${BASE_URL}/user/unfollow/60263f14648fed5246e322d8/60263f14648fed5246e322d9`,
  (req, res, ctx) => {
    const result = { message: 'Unfollowed user now' };
    return res(ctx.json(result));
  }
);

export const blockUserMock = rest.put(`${BASE_URL}/user/block/60263f14648fed5246e322d8`, (req, res, ctx) => {
  const result = { message: 'User blocked' };
  return res(ctx.json(result));
});

export const unblockUserMock = rest.put(`${BASE_URL}/user/unblock/60263f14648fed5246e322d8`, (req, res, ctx) => {
  const result = { message: 'User unblocked' };
  return res(ctx.json(result));
});

export const followingHandlers = [
  getUserFollowingMock,
  followUserMock,
  unFollowUserMock,
  getUserFollowersMock,
  blockUserMock,
  unblockUserMock,
  emptyUserFollowingMock,
  emptyUserFollowersMock
];

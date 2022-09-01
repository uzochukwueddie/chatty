import { postReactionOne, postReactionTwo } from '@mocks/data/post.mock';
import { BASE_ENDPOINT } from '@services/axios';
import { rest } from 'msw';

const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

export const getReactionsByUsernameMock = rest.get(`${BASE_URL}/post/reactions/username/Danny`, (req, res, ctx) => {
  const result = {
    message: 'Single post reaction by username',
    reactions: postReactionOne,
    count: 1
  };
  return res(ctx.json(result));
});

export const getPostReactionsMock = rest.get(`${BASE_URL}/post/reactions/6027f77087c9d9ccb1555268`, (req, res, ctx) => {
  const result = {
    message: 'Post reactions',
    reactions: [postReactionOne, postReactionTwo],
    count: 2
  };
  return res(ctx.json(result));
});

export const getSinglePostReactionMock = rest.get(
  `${BASE_URL}/post/single/reaction/username/Manny/6027f77087c9d9ccb1555268`,
  (req, res, ctx) => {
    const result = {
      message: 'Single post reaction',
      reactions: postReactionOne,
      count: 1
    };
    return res(ctx.json(result));
  }
);

export const addReactionMock = rest.post(`${BASE_URL}/post/reaction`, (req, res, ctx) => {
  const result = {
    message: 'Reaction added successfully'
  };
  return res(ctx.json(result));
});

export const reactionHandlers = [
  getReactionsByUsernameMock,
  getPostReactionsMock,
  getSinglePostReactionMock,
  addReactionMock
];

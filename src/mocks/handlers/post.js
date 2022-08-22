import { postComment, postMockData } from '@mocks/data/post.mock';
import { rest } from 'msw';

const BASE_URL = `${process.env.REACT_APP_BASE_ENDPOINT}/api/v1`;

export const getPostsMock = rest.get(`${BASE_URL}/post/all/1`, (req, res, ctx) => {
  const result = { message: 'All posts', posts: [postMockData, postMockData], totalPosts: 2 };
  return res(ctx.json(result));
});

export const emptyPostsMock = rest.get(`${BASE_URL}/post/all/1`, (req, res, ctx) => {
  const result = { message: 'All posts', posts: [], totalPosts: 0 };
  return res(ctx.json(result));
});

export const getPostsWithImagesMock = rest.get(`${BASE_URL}/post/images/1`, (req, res, ctx) => {
  const postWithImageOne = postMockData;
  postWithImageOne.imgVersion = '1652904922';
  postWithImageOne.imgId = 'sample.jpg';
  const result = { message: 'All posts with images', posts: [postWithImageOne] };
  return res(ctx.json(result));
});

export const emptyPostsWithImagesMock = rest.get(`${BASE_URL}/post/images/1`, (req, res, ctx) => {
  const result = { message: 'All posts with images', posts: [] };
  return res(ctx.json(result));
});

export const getPostCommentsMock = rest.get(`${BASE_URL}/post/comments/6027f77087c9d9ccb1555268`, (req, res, ctx) => {
  const result = { message: 'Post comments', comments: [postComment] };
  return res(ctx.json(result));
});

export const getPostCommentsNamesMock = rest.get(
  `${BASE_URL}/post/commentsnames/6027f77087c9d9ccb1555268`,
  (req, res, ctx) => {
    const result = { message: 'Post comments names', comments: ['Danny', 'Kenny', 'Sunny'] };
    return res(ctx.json(result));
  }
);

export const addPostMock = rest.post(`${BASE_URL}/post`, (req, res, ctx) => {
  const result = {
    message: 'Post created successfully'
  };
  return res(ctx.json(result));
});

export const updatePostMock = rest.put(`${BASE_URL}/post/6027f77087c9d9ccb1555269`, (req, res, ctx) => {
  const result = {
    message: 'Post updated successfully'
  };
  return res(ctx.json(result));
});

export const postsHandlers = [
  getPostsMock,
  getPostsWithImagesMock,
  emptyPostsWithImagesMock,
  emptyPostsMock,
  getPostCommentsMock,
  getPostCommentsNamesMock,
  addPostMock,
  updatePostMock
];

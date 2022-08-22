import reducer, { addToPosts } from '@redux/reducers/post/posts.reducer';

const initialState = {
  posts: [],
  totalPostsCount: 0,
  isLoading: false
};
const postData = {
  _id: '1234',
  post: 'This is a post',
  bgColor: 'red',
  privacy: 'Public',
  feelings: 'love',
  gifUrl: 'https://place-hold.it',
  profilePicture: 'https://place-hold.it',
  image: 'https://place-hold.it',
  userId: '234567',
  username: 'Manny',
  email: 'manny@test.com',
  avatarColor: 'blue',
  commentsCount: '1',
  reactions: [],
  imgVersion: '1233445',
  imgId: '123445',
  createdAt: '2022-06-15'
};

describe('posts reducer', () => {
  beforeEach(() => {
    initialState.posts = [];
    initialState.totalPostsCount = 0;
    initialState.isLoading = false;
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should posts to list', () => {
    expect(reducer(initialState, addToPosts([postData, postData]))).toEqual({
      posts: [postData, postData],
      totalPostsCount: 0,
      isLoading: false
    });
  });
});

import reducer, { clearPost, updatePostItem } from '@redux/reducers/post/post.reducer';
import { emptyPostData } from '@services/utils/static.data';
import _ from 'lodash';

let initialState = emptyPostData;
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

describe('post reducer', () => {
  beforeEach(() => {
    initialState = emptyPostData;
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(emptyPostData);
  });

  it('should update post data', () => {
    expect(reducer(initialState, updatePostItem(postData))).toEqual(postData);
  });

  it('should single post items', () => {
    let data = initialState;
    data = _.cloneDeep(data);
    data.username = 'Danny';
    data.post = 'This is a good day for us all.';
    expect(
      reducer(initialState, updatePostItem({ username: 'Danny', post: 'This is a good day for us all.' }))
    ).toEqual(data);
  });

  it('should clear post data', () => {
    initialState = postData;
    expect(reducer(initialState, clearPost())).toEqual(emptyPostData);
  });
});

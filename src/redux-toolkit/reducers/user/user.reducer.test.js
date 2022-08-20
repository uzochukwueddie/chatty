import reducer, { addUser, clearUser, updateUserProfile } from '@redux//reducers/user/user.reducer';

const initialState = {
  token: '',
  profile: null
};

describe('user reducer', () => {
  beforeEach(() => {
    initialState.token = '';
    initialState.profile = null;
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ token: '', profile: null });
  });

  it('should add user with token and profile', () => {
    expect(reducer(initialState, addUser({ token: '1234', profile: { username: 'manny' } }))).toEqual({
      token: '1234',
      profile: { username: 'manny' }
    });
  });

  it('should update user profile', () => {
    initialState.token = '123456';
    initialState.profile = { username: 'Manny' };
    expect(reducer(initialState, updateUserProfile({ username: 'Sunny' }))).toEqual({
      token: '123456',
      profile: { username: 'Sunny' }
    });
  });

  it('should reset profile and token', () => {
    initialState.token = '123456';
    initialState.profile = { username: 'Manny' };
    expect(reducer(initialState, clearUser())).toEqual({
      token: '',
      profile: null
    });
  });
});

import reducer, { addReactions } from '@redux/reducers/post/user-post-reaction.reducer';

const initialState = {
  reactions: []
};

describe('user posts reaction reducer', () => {
  beforeEach(() => {
    initialState.reactions = [];
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should reactions to list', () => {
    expect(reducer(initialState, addReactions([{ type: 'love', value: 10 }]))).toEqual({
      reactions: [{ type: 'love', value: 10 }]
    });
  });
});

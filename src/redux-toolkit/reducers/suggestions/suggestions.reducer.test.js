import reducer, { addToSuggestions } from '@redux/reducers/user/suggestions.reducer';

const initialState = {
  users: [],
  isLoading: false
};

describe('suggestions reducer', () => {
  beforeEach(() => {
    initialState.users = [];
    initialState.isLoading = false;
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      users: [],
      isLoading: false
    });
  });

  it('should add users to suggestions', () => {
    expect(reducer(initialState, addToSuggestions({ users: [1, 2, 3, 4, 5], isLoading: true }))).toEqual({
      users: [1, 2, 3, 4, 5],
      isLoading: true
    });
  });
});

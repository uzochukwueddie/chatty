import Suggestions from '@components/suggestions/Suggestions';
import { addToSuggestions } from '@redux/reducers/user/suggestions.reducer';
import { store } from '@redux/store';
import { render, screen, waitFor } from '@root/test.utils';
import userEvent from '@testing-library/user-event';

const user = {
  _id: '12345',
  uId: 23456,
  username: 'Sunny',
  email: 'sunny@test.com',
  avatarColor: 'red',
  postsCount: 2,
  work: '',
  school: '',
  quote: '',
  location: '',
  blocked: [],
  blockedBy: [],
  followersCount: 1,
  followingCount: 1,
  notifications: null,
  social: null,
  createdAt: '2022-06-15',
  bgImageVersion: '',
  bgImageId: '',
  profilePicture: ''
};

describe('Suggestions', () => {
  it('should have items in list', () => {
    store.dispatch(addToSuggestions({ users: [user, user, user], isLoading: false }));
    render(<Suggestions />);
    const items = screen.queryAllByTestId('suggestions-item');
    expect(items.length).toEqual(3);
  });

  it('should display view more', () => {
    store.dispatch(
      addToSuggestions({ users: [user, user, user, user, user, user, user, user, user, user], isLoading: false })
    );
    const { baseElement } = render(<Suggestions />);
    const items = screen.queryAllByTestId('suggestions-item');
    const viewMore = baseElement.querySelector('.view-more');
    expect(items.length).toEqual(10);
    expect(viewMore).toBeInTheDocument();
  });

  it('should change url when view more is clicked', async () => {
    store.dispatch(
      addToSuggestions({ users: [user, user, user, user, user, user, user, user, user, user], isLoading: false })
    );
    const { baseElement } = render(<Suggestions />);
    const viewMore = baseElement.querySelector('.view-more');
    userEvent.click(viewMore);
    expect(viewMore).toBeInTheDocument();
    await waitFor(() => expect(window.location.pathname).toEqual('/app/social/people'));
  });
});

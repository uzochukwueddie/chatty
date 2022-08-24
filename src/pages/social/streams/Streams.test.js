import { postMockData } from '@mocks/data/post.mock';
import { emptyPostsMock } from '@mocks/handlers/post';
import { server } from '@mocks/server';
import Streams from '@pages/social/streams/Streams';
import { addToPosts } from '@redux/reducers/post/posts.reducer';
import { store } from '@redux/store';
import { render, screen, waitFor } from '@root/test.utils';
import { act } from 'react-dom/test-utils';

jest.mock('@hooks/useEffectOnce');

describe('Streams', () => {
  beforeAll(() => {
    act(() => {
      window.localStorage.setItem('username', JSON.stringify('Danny'));
      store.dispatch(addToPosts([postMockData]));
    });
  });

  afterAll(() => {
    window.localStorage.removeItem('username');
  });

  it('should not be null', async () => {
    render(<Streams />);
    let streamElementItems;
    await act(() => {
      streamElementItems = screen.getByTestId('streams');
    });
    await waitFor(() => {
      expect(streamElementItems).not.toBeNull();
    });
  });

  it('should have post form component', async () => {
    render(<Streams />);
    let postForm;
    await act(() => {
      postForm = screen.queryByTestId('post-form');
    });
    await waitFor(() => {
      expect(postForm).toBeInTheDocument();
    });
  });

  it('should have posts component', async () => {
    render(<Streams />);
    let posts;
    await act(() => {
      posts = screen.queryByTestId('posts');
    });
    await waitFor(() => {
      expect(posts).toBeInTheDocument();
    });
  });

  it('should have suggestions component', async () => {
    render(<Streams />);
    let suggestions;
    await act(() => {
      suggestions = screen.queryByTestId('suggestions-container');
    });
    await waitFor(() => {
      expect(suggestions).toBeInTheDocument();
    });
  });

  it('should not have empty posts component', async () => {
    server.use(emptyPostsMock);
    render(<Streams />);
    let posts;
    await act(() => {
      posts = screen.queryByTestId('posts-item');
    });
    await waitFor(() => {
      expect(posts).not.toBeInTheDocument();
    });
  });
});

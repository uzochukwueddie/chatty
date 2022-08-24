import Post from '@components/posts/post/Post';
import { postMockData } from '@mocks/data/post.mock';
import { updatePostItem } from '@redux/reducers/post/post.reducer';
import { store } from '@redux/store';
import { fireEvent, render, screen } from '@root/test.utils';
import { timeAgo } from '@services/utils/timeago.utils';
import { act } from 'react-dom/test-utils';

describe('Post', () => {
  beforeEach(() => {
    act(() => {
      store.dispatch(updatePostItem(postMockData));
    });
    window.localStorage.setItem('selectedPostId', JSON.stringify(`${postMockData._id}`));
  });

  afterEach(() => {
    postMockData.bgColor = '#f44336';
    postMockData.post = 'how are you?';
    window.localStorage.removeItem('selectedPostId');
  });

  it('should have post wrapper', () => {
    render(<Post post={postMockData} showIcons={false} />);
    const postWrapper = screen.queryByTestId('post');
    expect(postWrapper).toBeInTheDocument();
  });

  it('should have user avatar', () => {
    render(<Post post={postMockData} showIcons={false} />);
    const imgElements = screen.queryAllByRole('img');
    expect(imgElements[0]).toBeInTheDocument();
  });

  it('should have username', async () => {
    render(<Post post={postMockData} showIcons={false} />);
    const usernameElement = await screen.findByTestId('username');
    expect(usernameElement).toBeInTheDocument();
    expect(usernameElement.childNodes.item(0).textContent).toEqual(postMockData.username);
  });

  it('should have feelings element', async () => {
    render(<Post post={postMockData} showIcons={false} />);
    const feelingsElement = await screen.findByTestId('inline-display');
    expect(feelingsElement).toBeInTheDocument();
    expect(feelingsElement.textContent).toEqual('is feeling  happy');
  });

  it('should display post icons', async () => {
    render(<Post post={postMockData} showIcons={true} />);
    const postIconElement = await screen.findByTestId('post-icons');
    expect(postIconElement).toBeInTheDocument();
    expect(postIconElement.childNodes.length).toEqual(2);
  });

  it('should display post time and privacy', async () => {
    const { baseElement } = render(<Post post={postMockData} showIcons={false} />);
    const timeDisplayElement = await screen.findByTestId('time-display');
    expect(timeDisplayElement).toBeInTheDocument();
    expect(timeDisplayElement.childNodes.item(0).textContent).toEqual(timeAgo.transform(postMockData.createdAt));
    expect(baseElement.querySelector('.globe')).toBeInTheDocument();
  });

  it('should display post', async () => {
    postMockData.bgColor = '#ffffff';
    render(<Post post={postMockData} showIcons={false} />);
    const userPostElement = await screen.findByTestId('user-post');
    expect(userPostElement).toBeInTheDocument();
    expect(userPostElement.textContent).toEqual(postMockData.post);
  });

  it('should display post with colored background', async () => {
    render(<Post post={postMockData} showIcons={false} />);
    const userPostElement = await screen.findByTestId('user-post-with-bg');
    expect(userPostElement).toBeInTheDocument();
    expect(userPostElement).toHaveStyle({ backgroundColor: 'rgb(244, 67, 54)' });
  });

  it('should display post image', async () => {
    postMockData.bgColor = '#ffffff';
    render(<Post post={postMockData} showIcons={false} />);
    const postImage = await screen.findByTestId('post-image');
    expect(postImage).toBeInTheDocument();
    expect(postImage.childNodes.item(0)).toHaveAttribute(
      'src',
      'https://res.cloudinary.com/dyamr9ym3/image/upload/v2/1'
    );
  });

  it('should display image modal on image click', async () => {
    postMockData.bgColor = '#ffffff';
    render(<Post post={postMockData} showIcons={false} />);
    const postImage = await screen.findByTestId('post-image');
    fireEvent.click(postImage);
    const imageModal = await screen.findByTestId('image-modal');
    expect(imageModal).toBeInTheDocument();
  });

  it('should display comment section', async () => {
    render(<Post post={postMockData} showIcons={false} />);
    const commentSection = await screen.findByTestId('comment-section');
    expect(commentSection).toBeInTheDocument();
  });

  it('should display comment input', async () => {
    render(<Post post={postMockData} showIcons={false} />);
    const commentInput = await screen.findByTestId('comment-input');
    expect(commentInput).toBeInTheDocument();
  });
});

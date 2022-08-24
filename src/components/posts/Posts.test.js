import Posts from '@components/posts/Posts';
import { postMockData } from '@mocks/data/post.mock';
import { render, screen } from '@root/test.utils';
import { PostUtils } from '@services/utils/post-utils.service';
import { Utils } from '@services/utils/utils.service';

describe('Posts', () => {
  let props;
  beforeEach(() => {
    props = {
      allPosts: [],
      userFollowing: [],
      postsLoading: false
    };
  });

  it('should not have post items', () => {
    render(<Posts {...props} />);
    const postItems = screen.queryAllByTestId('posts-item');
    expect(postItems.length).toEqual(0);
  });

  it('should have post items', () => {
    props.allPosts = [postMockData];
    render(<Posts {...props} />);
    const postItems = screen.queryAllByTestId('posts-item');
    expect(postItems.length).toEqual(1);
  });

  it('should not display post if user is blocked', async () => {
    jest.spyOn(Utils, 'checkIfUserIsBlocked').mockReturnValue(true);
    jest.spyOn(PostUtils, 'checkPrivacy').mockReturnValue(true);
    props.allPosts = [postMockData];
    render(<Posts {...props} />);
    const postElement = screen.queryByTestId('post');
    expect(postElement).not.toBeInTheDocument();
  });

  it('should display post if user is not blocked', async () => {
    jest.spyOn(Utils, 'checkIfUserIsBlocked').mockReturnValue(false);
    jest.spyOn(PostUtils, 'checkPrivacy').mockReturnValue(true);
    props.allPosts = [postMockData];
    render(<Posts {...props} />);
    const postElement = await screen.findByTestId('post');
    expect(postElement).toBeInTheDocument();
  });

  it('should display post if post is public', async () => {
    jest.spyOn(Utils, 'checkIfUserIsBlocked').mockReturnValue(false);
    jest.spyOn(PostUtils, 'checkPrivacy').mockReturnValue(true);
    props.allPosts = [postMockData];
    render(<Posts {...props} />);
    const postElement = await screen.findByTestId('post');
    expect(postElement).toBeInTheDocument();
  });

  it('should not display post if post is private', async () => {
    jest.spyOn(Utils, 'checkIfUserIsBlocked').mockReturnValue(false);
    jest.spyOn(PostUtils, 'checkPrivacy').mockReturnValue(false);
    props.allPosts = [postMockData];
    render(<Posts {...props} />);
    const postElement = screen.queryByTestId('post');
    expect(postElement).not.toBeInTheDocument();
  });
});

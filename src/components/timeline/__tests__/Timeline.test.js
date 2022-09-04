import Timeline from '@components/timeline/Timeline';
import { postMockData } from '@mocks/data/post.mock';
import { existingUser, existingUserTwo } from '@mocks/data/user.mock';
import { addUser } from '@redux/reducers/user/user.reducer';
import { store } from '@redux/store';
import { render, screen } from '@root/test.utils';
import { PostUtils } from '@services/utils/post-utils.service';
import { Utils } from '@services/utils/utils.service';
import { createBrowserHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { createSearchParams } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    username: 'Manny'
  })
}));

describe('Timeline', () => {
  beforeAll(() => {
    window.localStorage.setItem('username', JSON.stringify('Danny'));
    act(() => {
      store.dispatch(addUser({ token: '123456', profile: existingUser }));
    });
    const url = `/app/social/profile/${existingUser?.username}?${createSearchParams({
      id: existingUser._id,
      uId: existingUser.uId
    })}`;
    const history = createBrowserHistory();
    history.push(url);
  });

  afterAll(() => {
    window.localStorage.removeItem('username');
  });

  it('should be in the document', async () => {
    const props = {
      loading: true,
      userProfileData: undefined
    };
    render(<Timeline {...props} />);
    let timelineComponent;
    await act(() => {
      timelineComponent = screen.queryByTestId('timeline');
    });
    expect(timelineComponent).toBeInTheDocument();
  });

  it('should display skeleton', async () => {
    const props = {
      loading: true,
      userProfileData: undefined
    };
    render(<Timeline {...props} />);
    let postFormSkeleton;
    let postsSkeleton;
    await act(() => {
      postFormSkeleton = screen.queryByTestId('post-form-skeleton');
      postsSkeleton = screen.queryAllByTestId('posts-skeleton');
    });
    expect(postFormSkeleton).toBeInTheDocument();
    postsSkeleton.forEach((skeleton) => {
      expect(skeleton).toBeInTheDocument();
    });
  });

  it('should display empty message', async () => {
    const props = {
      loading: false,
      userProfileData: null
    };
    render(<Timeline {...props} />);
    let emptyPage;
    await act(() => {
      emptyPage = screen.queryByTestId('empty-page');
    });
    expect(emptyPage).toBeInTheDocument();
    expect(emptyPage.textContent).toEqual('No post available');
  });

  it('should display side components', async () => {
    const props = {
      loading: false,
      userProfileData: undefined
    };
    render(<Timeline {...props} />);
    let countContainer;
    let sideContainer;
    await act(() => {
      countContainer = screen.queryByTestId('count-container');
      sideContainer = screen.queryAllByTestId('side-container');
    });
    expect(countContainer).toBeInTheDocument();
    sideContainer.forEach((container) => {
      expect(container).toBeInTheDocument();
    });
  });

  it('should display post form component', async () => {
    const props = {
      loading: false,
      userProfileData: {
        posts: [postMockData],
        user: existingUser
      }
    };
    render(<Timeline {...props} />);
    let postForm;
    await act(() => {
      postForm = screen.queryByTestId('post-form');
    });
    expect(postForm).toBeInTheDocument();
  });

  it('should display post if user is not blocked', async () => {
    jest.spyOn(Utils, 'checkIfUserIsBlocked').mockReturnValue(false);
    jest.spyOn(PostUtils, 'checkPrivacy').mockReturnValue(true);
    const props = {
      loading: false,
      userProfileData: {
        posts: [postMockData],
        user: existingUser
      }
    };
    render(<Timeline {...props} />);
    await act(() => {});
    const postElement = await screen.findByTestId('post');
    expect(postElement).toBeInTheDocument();
  });

  it('should not display post form component for a different user', async () => {
    jest.spyOn(Utils, 'checkIfUserIsBlocked').mockReturnValue(false);
    jest.spyOn(PostUtils, 'checkPrivacy').mockReturnValue(true);
    const props = {
      loading: false,
      userProfileData: {
        posts: [postMockData],
        user: existingUserTwo
      }
    };
    render(<Timeline {...props} />);
    let postForm;
    await act(() => {
      store.dispatch(addUser({ token: '123456', profile: existingUserTwo }));
      postForm = screen.queryByTestId('post-form');
    });
    expect(postForm).not.toBeInTheDocument();
  });
});

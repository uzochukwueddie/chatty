import { existingUser, existingUserTwo } from '@mocks/data/user.mock';
import { emptyUserFollowingMock } from '@mocks/handlers/following';
import { server } from '@mocks/server';
import Following from '@pages/social/following/Following';
import { addUser } from '@redux/reducers/user/user.reducer';
import { store } from '@redux/store';
import { render, screen } from '@root/test.utils';
import { socketService } from '@services/socket/socket.service';
import { FollowersUtils } from '@services/utils/followers-utils.service';
import { Utils } from '@services/utils/utils.service';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

socketService.setupSocketConnection();

describe('Following', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    socketService.socket.disconnect();
  });

  it('should display empty message', async () => {
    server.use(emptyUserFollowingMock);
    render(<Following />);
    const cardElementItems = screen.queryByTestId('card-element-item');
    const emptyPage = await screen.findByTestId('empty-page');
    expect(cardElementItems).toBeNull();
    expect(emptyPage).toBeInTheDocument();
    expect(emptyPage.textContent).toEqual('You have no following');
  });

  it('should have 2 card element item', async () => {
    render(<Following />);
    const cardElementItems = await screen.findAllByTestId('card-element-item');
    expect(cardElementItems.length).toEqual(2);
  });

  it('should have card element stats values', async () => {
    render(<Following />);
    const cardElementItems = await screen.findAllByTestId('info');
    expect(cardElementItems[0].textContent).toEqual('2');
    expect(cardElementItems[1].textContent).toEqual('1');
    expect(cardElementItems[2].textContent).toEqual('2');
  });

  it('should have card element buttons', async () => {
    render(<Following />);
    const cardElementButtons = await screen.findAllByTestId('card-element-buttons');
    expect(cardElementButtons[0]).toBeInTheDocument();
    expect(cardElementButtons[0].childElementCount).toEqual(2);
    expect(cardElementButtons[0].children[0].textContent).toEqual('Unfollow');
    expect(cardElementButtons[0].children[1].textContent).toEqual('Profile');
  });

  it('should handle follow button', async () => {
    jest.spyOn(Utils, 'checkIfUserIsFollowed').mockReturnValueOnce(false);
    jest.spyOn(FollowersUtils, 'followUser');
    render(<Following />);
    act(() => {
      store.dispatch(addUser({ token: '123456', profile: existingUser }));
    });
    const cardElementButtons = await screen.findAllByTestId('card-element-buttons');
    userEvent.click(cardElementButtons[0].children[0]);
    expect(cardElementButtons[0].children[0].textContent).toEqual('Follow');
    expect(FollowersUtils.followUser).toHaveBeenCalledWith(existingUserTwo, expect.any(Function));
  });

  it('should handle unfollow button', async () => {
    jest.spyOn(Utils, 'checkIfUserIsFollowed').mockReturnValueOnce(true);
    jest.spyOn(socketService.socket, 'emit');
    jest.spyOn(FollowersUtils, 'unFollowUser');
    jest.spyOn(FollowersUtils, 'socketIORemoveFollowing');
    render(<Following />);
    act(() => {
      store.dispatch(addUser({ token: '123456', profile: existingUser }));
    });
    const cardElementButtons = await screen.findAllByTestId('card-element-buttons');
    userEvent.click(cardElementButtons[0].children[0]);
    expect(cardElementButtons[0].children[0].textContent).toEqual('Unfollow');
    expect(socketService.socket.emit).toHaveBeenCalledWith('unfollow user', existingUserTwo);
    expect(FollowersUtils.unFollowUser).toHaveBeenCalledWith(existingUserTwo, existingUser, expect.any(Function));
    expect(FollowersUtils.socketIORemoveFollowing).toHaveBeenCalledWith([], expect.any(Function));
  });

  it('should change url when profile button is clicked', async () => {
    render(<Following />);
    const cardElementButtons = await screen.findAllByTestId('card-element-buttons');
    userEvent.click(cardElementButtons[0].children[1]);
    const newUrl = `${window.location.pathname}${window.location.search}`;
    const isProfileUrl = Utils.checkUrl(newUrl, 'profile');
    expect(isProfileUrl).toBeTruthy();
  });
});

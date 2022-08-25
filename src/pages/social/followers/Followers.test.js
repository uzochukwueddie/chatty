import { existingUser, existingUserTwo } from '@mocks/data/user.mock';
import { emptyUserFollowersMock } from '@mocks/handlers/following';
import { server } from '@mocks/server';
import Followers from '@pages/social/followers/Followers';
import { addUser } from '@redux/reducers/user/user.reducer';
import { store } from '@redux/store';
import { render, screen } from '@root/test.utils';
import { socketService } from '@services/socket/socket.service';
import { FollowersUtils } from '@services/utils/followers-utils.service';
import { Utils } from '@services/utils/utils.service';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

socketService.setupSocketConnection();

describe('Followers', () => {
  beforeEach(() => {
    act(() => {
      store.dispatch(addUser({ token: '123456', profile: existingUser }));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    socketService.socket.disconnect();
  });

  it('should display empty message', async () => {
    server.use(emptyUserFollowersMock);
    render(<Followers />);
    const cardElementItems = screen.queryByTestId('card-element-item');
    const emptyPage = await screen.findByTestId('empty-page');
    expect(cardElementItems).toBeNull();
    expect(emptyPage).toBeInTheDocument();
    expect(emptyPage.textContent).toEqual('You have no followers');
  });

  it('should have 2 card element item', async () => {
    render(<Followers />);
    const cardElementItems = await screen.findAllByTestId('card-element-item');
    expect(cardElementItems.length).toEqual(2);
  });

  it('should have card element stats values', async () => {
    render(<Followers />);
    const cardElementItems = await screen.findAllByTestId('info');
    expect(cardElementItems[0].textContent).toEqual('2');
    expect(cardElementItems[1].textContent).toEqual('1');
    expect(cardElementItems[2].textContent).toEqual('2');
  });

  it('should have card element buttons', async () => {
    render(<Followers />);
    const cardElementButtons = await screen.findAllByTestId('card-element-buttons');
    expect(cardElementButtons[0]).toBeInTheDocument();
    expect(cardElementButtons[0].childElementCount).toEqual(2);
    expect(cardElementButtons[0].children[0].textContent).toEqual('Block');
    expect(cardElementButtons[0].children[1].textContent).toEqual('Profile');
  });

  it('should handle block button', async () => {
    jest.spyOn(Utils, 'checkIfUserIsBlocked').mockReturnValueOnce(false);
    jest.spyOn(FollowersUtils, 'blockUser');
    jest.spyOn(socketService.socket, 'emit');
    jest.spyOn(FollowersUtils, 'socketIOBlockAndUnblock');
    render(<Followers />);
    const cardElementButtons = await screen.findAllByTestId('card-element-buttons');
    userEvent.click(cardElementButtons[0].children[0]);
    expect(cardElementButtons[0].children[0].textContent).toEqual('Block');
    expect(socketService.socket.emit).toHaveBeenCalledWith('block user', {
      blockedUser: existingUserTwo._id,
      blockedBy: existingUser._id
    });
    expect(FollowersUtils.blockUser).toHaveBeenCalledWith(existingUserTwo, expect.any(Function));
    expect(FollowersUtils.socketIOBlockAndUnblock).toHaveBeenCalledWith(
      existingUser,
      '123456',
      expect.any(Function),
      expect.any(Function)
    );
  });

  it('should handle unblock button', async () => {
    jest.spyOn(Utils, 'checkIfUserIsBlocked').mockReturnValueOnce(true);
    jest.spyOn(socketService.socket, 'emit');
    jest.spyOn(FollowersUtils, 'unblockUser');
    jest.spyOn(FollowersUtils, 'socketIOBlockAndUnblock');
    render(<Followers />);
    const cardElementButtons = await screen.findAllByTestId('card-element-buttons');
    userEvent.click(cardElementButtons[0].children[0]);
    expect(cardElementButtons[0].children[0].textContent).toEqual('Unblock');
    expect(socketService.socket.emit).toHaveBeenCalledWith('unblock user', {
      blockedUser: existingUserTwo._id,
      blockedBy: existingUser._id
    });
    expect(FollowersUtils.unblockUser).toHaveBeenCalledWith(existingUserTwo, expect.any(Function));
    expect(FollowersUtils.socketIOBlockAndUnblock).toHaveBeenCalledWith(
      existingUser,
      '123456',
      expect.any(Function),
      expect.any(Function)
    );
  });

  it('should change url when profile button is clicked', async () => {
    render(<Followers />);
    const cardElementButtons = await screen.findAllByTestId('card-element-buttons');
    userEvent.click(cardElementButtons[0].children[1]);
    const newUrl = `${window.location.pathname}${window.location.search}`;
    const isProfileUrl = Utils.checkUrl(newUrl, 'profile');
    expect(isProfileUrl).toBeTruthy();
  });
});

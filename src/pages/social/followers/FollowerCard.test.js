import { existingUser, existingUserTwo } from '@mocks/data/user.mock';
import FollowerCard from '@pages/social/followers/FollowerCard';
import { addUser } from '@redux/reducers/user/user.reducer';
import { store } from '@redux/store';
import { render, screen } from '@root/test.utils';
import { socketService } from '@services/socket/socket.service';
import { FollowersUtils } from '@services/utils/followers-utils.service';
import { Utils } from '@services/utils/utils.service';
import userEvent from '@testing-library/user-event';
import { createBrowserHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { createSearchParams } from 'react-router-dom';

socketService.setupSocketConnection();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    username: 'Manny'
  })
}));

describe('FollowerCard', () => {
  beforeEach(() => {
    act(() => {
      store.dispatch(addUser({ token: '123456', profile: existingUser }));
    });
    const url = `/app/social/profile/${existingUser?.username}?${createSearchParams({
      id: existingUser?._id,
      uId: existingUser?.uId
    })}`;
    const history = createBrowserHistory();
    history.push(url);
  });

  afterAll(() => {
    socketService.socket.disconnect();
  });

  it('should have 2 card element item', async () => {
    render(<FollowerCard />);
    const cardElementItems = await screen.findAllByTestId('card-element-item');
    expect(cardElementItems.length).toEqual(2);
  });

  it('should followers count', async () => {
    render(<FollowerCard />);
    const cardElementCount = await screen.findAllByTestId('count');
    expect(cardElementCount[0].textContent).toEqual('2');
    expect(cardElementCount[1].textContent).toEqual('2');
  });

  it('should handle block button', async () => {
    jest.spyOn(Utils, 'checkIfUserIsBlocked').mockReturnValue(false);
    jest.spyOn(FollowersUtils, 'blockUser');
    jest.spyOn(socketService.socket, 'emit');
    jest.spyOn(FollowersUtils, 'socketIOBlockAndUnblockCard');
    render(<FollowerCard userData={existingUser} />);
    await act(() => {});
    const cardElementButtons = await screen.findAllByTestId('card-following-button');
    userEvent.click(cardElementButtons[0].children[0]);
    expect(cardElementButtons[0].children[0].textContent).toEqual('Block');
    expect(socketService.socket.emit).toHaveBeenCalledWith('block user', {
      blockedUser: existingUserTwo._id,
      blockedBy: existingUser._id
    });
    expect(FollowersUtils.blockUser).toHaveBeenCalledWith(existingUserTwo, expect.any(Function));
    expect(FollowersUtils.socketIOBlockAndUnblockCard).toHaveBeenCalledWith(existingUser, expect.any(Function));
  });

  it('should handle unblock button', async () => {
    jest.spyOn(Utils, 'checkIfUserIsBlocked').mockReturnValue(true);
    jest.spyOn(FollowersUtils, 'unblockUser');
    jest.spyOn(socketService.socket, 'emit');
    jest.spyOn(FollowersUtils, 'socketIOBlockAndUnblockCard');
    render(<FollowerCard userData={existingUser} />);
    await act(() => {});
    const cardElementButtons = await screen.findAllByTestId('card-following-button');
    userEvent.click(cardElementButtons[0].children[0]);
    expect(cardElementButtons[0].children[0].textContent).toEqual('Unblock');
    expect(socketService.socket.emit).toHaveBeenCalledWith('unblock user', {
      blockedUser: existingUserTwo._id,
      blockedBy: existingUser._id
    });
    expect(FollowersUtils.unblockUser).toHaveBeenCalledWith(existingUserTwo, expect.any(Function));
    expect(FollowersUtils.socketIOBlockAndUnblockCard).toHaveBeenCalledWith(existingUser, expect.any(Function));
  });
});

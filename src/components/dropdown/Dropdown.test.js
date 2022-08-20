import Dropdown from '@components/dropdown/Dropdown';
import { render, screen } from '@root/test.utils';
import userEvent from '@testing-library/user-event';

describe('Dropdown', () => {
  it('should display notification content', () => {
    const onMarkAsRead = jest.fn();
    const onDeleteNotification = jest.fn();
    const item = {
      _id: '123',
      topText: 'This is a test',
      subText: 'Subtext',
      createdAt: '2022-06-14',
      username: 'Danny',
      avatarColor: 'red',
      profilePicture: 'https://place-hold.it',
      read: false,
      post: 'This is my post',
      imgUrl: '',
      comment: '',
      reaction: '',
      senderName: '',
      notificationType: ''
    };
    const props = {
      data: [item, item, item],
      notificationCount: 1,
      title: 'Notifications',
      style: { right: '250px', top: '20px' },
      height: 300,
      onMarkAsRead,
      onDeleteNotification,
      onLogout: null,
      onNavigate: null
    };
    const { baseElement } = render(<Dropdown {...props} />);
    const smallElement = screen.getByText(1);
    const infoContainer = screen.getByTestId('info-container');
    const topTextElement = screen.getAllByText('This is a test');
    const trashIcon = baseElement.querySelector('.trash');
    userEvent.click(topTextElement[0]);
    userEvent.click(trashIcon);
    expect(smallElement).toBeInTheDocument();
    expect(infoContainer.childElementCount).toEqual(3);
    expect(onMarkAsRead).toHaveBeenCalledTimes(1);
    expect(onDeleteNotification).toHaveBeenCalledTimes(1);
  });

  it('should display settings content', () => {
    const onLogout = jest.fn();
    const onNavigate = jest.fn();
    const item = {
      _id: '123',
      topText: 'My Profile',
      subText: 'View profile',
      createdAt: '2022-06-14',
      username: 'Danny',
      avatarColor: 'red',
      profilePicture: 'https://place-hold.it'
    };
    const props = {
      data: [item],
      notificationCount: 0,
      title: 'Settings',
      style: { right: '250px', top: '20px' },
      height: 300,
      onMarkAsRead: null,
      onDeleteNotification: null,
      onLogout,
      onNavigate
    };
    const { baseElement } = render(<Dropdown {...props} />);
    const buttonElement = baseElement.querySelector('.signOut');
    const infoContainer = screen.getByTestId('info-container');
    const topTextElement = screen.getAllByText('My Profile');
    userEvent.click(topTextElement[0]);
    userEvent.click(buttonElement);
    expect(buttonElement).toBeInTheDocument();
    expect(infoContainer.childElementCount).toEqual(1);
    expect(onNavigate).toHaveBeenCalledTimes(1);
    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});

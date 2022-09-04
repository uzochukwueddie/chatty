import Sidebar from '@components/sidebar/Sidebar';
import { render, screen, waitFor, within } from '@root/test.utils';
import { socketService } from '@services/socket/socket.service';
import { sideBarItems } from '@services/utils/static.data';
import userEvent from '@testing-library/user-event';

socketService.setupSocketConnection();

describe('Sidebar', () => {
  beforeEach(() => {
    jest.spyOn(socketService?.socket, 'off');
  });

  afterAll(() => {
    socketService?.socket?.disconnect();
  });

  it('should have its list elements', () => {
    render(<Sidebar />);
    const listElement = screen.getByRole('list');
    const { getAllByRole } = within(listElement);
    const items = getAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0);
  });

  it('should change url when clicked', async () => {
    render(<Sidebar />);
    const listItem = screen.getAllByTestId('sidebar-list');
    userEvent.click(listItem[1]);
    const url = sideBarItems[1].url;
    await waitFor(() => expect(window.location.pathname).toEqual(url));
  });

  it('should have active class on selected item', async () => {
    render(<Sidebar />);
    const listItem = screen.getAllByTestId('sidebar-list');
    userEvent.click(listItem[1]);
    await waitFor(() => expect(listItem[1]).toHaveClass('active'));
  });
});

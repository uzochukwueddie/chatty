import Header from '@components/header/Header';
import { existingUser } from '@mocks/data/user.mock';
import { addUser } from '@redux/reducers/user/user.reducer';
import { store } from '@redux/store';
import { render, screen, within } from '@root/test.utils';
import { socketService } from '@services/socket/socket.service';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

socketService.setupSocketConnection();

describe('Header', () => {
  describe('skeleton', () => {
    afterAll(() => {
      socketService.socket.disconnect();
    });

    it('should be displayed', async () => {
      jest.spyOn(socketService.socket, 'emit');
      render(<Header />);
      await act(() => {});
      const skeleton = await screen.findByTestId('header-skeleton');
      expect(skeleton).toBeInTheDocument();
    });
  });

  describe('body', () => {
    beforeEach(() => {
      act(() => {
        store.dispatch(addUser({ token: '123456', profile: existingUser }));
      });
    });

    afterAll(() => {
      socketService.socket.disconnect();
    });

    it('should be displayed', async () => {
      jest.spyOn(socketService.socket, 'emit');
      render(<Header />);
      await act(() => {});
      const headerWrapper = await screen.findByTestId('header-wrapper');
      expect(headerWrapper).toBeInTheDocument();
    });

    it('should have header image', async () => {
      render(<Header />);
      await act(() => {});
      const headerImage = await screen.findByTestId('header-image');
      expect(headerImage).toBeInTheDocument();
      expect(headerImage.childNodes.item(0)).toHaveAttribute('src', 'logo.svg');
      expect(headerImage.childNodes.item(1)).toHaveTextContent(/chatty/i);
    });

    it('should have nav list items', async () => {
      render(<Header />);
      await act(() => {});
      const listElement = await screen.findAllByRole('list');
      const { getAllByRole } = within(listElement[0]);
      const items = getAllByRole('listitem');
      expect(items.length).toBeGreaterThan(0);
    });

    it('should display notification dropdown', async () => {
      render(<Header />);
      const listItem = await screen.findByTestId('notification-list-item');
      await act(() => {
        userEvent.click(listItem);
      });
      const dropdownElement = await screen.findByTestId('dropdown');
      const notificationsText = await screen.findByText(/notifications/i);
      const notificationDots = await screen.findByTestId('notification-dots');
      expect(dropdownElement).toBeInTheDocument();
      expect(notificationsText).toBeInTheDocument();
      expect(notificationDots).toBeInTheDocument();
      expect(parseInt(notificationDots.textContent, 10)).toBeGreaterThan(0);
    });

    it('should display message sidebar', async () => {
      render(<Header />);
      const listItem = await screen.findByTestId('message-list-item');
      await act(() => {
        userEvent.click(listItem);
      });
      const messageSidebarElement = await screen.findByTestId('message-sidebar');
      const messagesText = await screen.findByText(/messages/i);
      expect(messageSidebarElement).toBeInTheDocument();
      expect(messagesText).toBeInTheDocument();
    });

    it('should display settings dropdown', async () => {
      render(<Header />);
      const listItem = await screen.findByTestId('settings-list-item');
      await act(() => {
        userEvent.click(listItem);
      });
      const dropdownElement = await screen.findByTestId('dropdown');
      expect(dropdownElement).toBeInTheDocument();
    });
  });
});

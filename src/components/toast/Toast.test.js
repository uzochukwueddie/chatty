import checkIcon from '@assets/images/check.svg';
import errorIcon from '@assets/images/error.svg';
import Toast from '@components/toast/Toast';
import { render, screen, waitFor } from '@root/test.utils';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Toast', () => {
  it('should display a toast', async () => {
    const props = {
      position: 'top-left',
      toastList: [{ id: 1, backgroundColor: '#5cb85c', icon: checkIcon, description: 'This is a message' }],
      autoDelete: false,
      autoDeleteTime: 100
    };
    const { baseElement } = render(<Toast {...props} />);
    const toastContainer = baseElement.querySelector('.toast-notification-container');
    const toastContainerElements = screen.getAllByTestId('toast-notification');

    expect(toastContainer).toBeInTheDocument();
    expect(toastContainer).toHaveClass(props.position);
    expect(toastContainerElements.length).toEqual(1);
  });

  it('should have toast elements', async () => {
    const props = {
      position: 'top-left',
      toastList: [{ id: 1, backgroundColor: '#5cb85c', icon: checkIcon, description: 'This is a message' }],
      autoDelete: false,
      autoDeleteTime: 100
    };
    render(<Toast {...props} />);
    const toastContainerElements = screen.getAllByTestId('toast-notification');
    const imgElement = screen.getByRole('img');
    const description = screen.getByText(/this is a message/i);
    const styles = window.getComputedStyle(toastContainerElements[0]);

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'check.svg');
    expect(styles.backgroundColor).toEqual('rgb(92, 184, 92)');
    expect(description).toBeInTheDocument();
  });

  it('should remove toast by calling deleteToast', async () => {
    const props = {
      position: 'top-left',
      toastList: [
        { id: 1, backgroundColor: '#5cb85c', icon: checkIcon, description: 'This is a message' },
        { id: 2, backgroundColor: '#d9534f', icon: errorIcon, description: 'This is an error' }
      ],
      autoDelete: false,
      autoDeleteTime: 100
    };
    render(<Toast {...props} />);
    const buttonElements = screen.getAllByRole('button');
    userEvent.click(buttonElements[0]);
    await waitFor(() => expect(screen.queryAllByTestId('toast-notification').length).toEqual(1));
  });

  it('should autoremove toast', async () => {
    jest.useFakeTimers();
    const props = {
      position: 'top-left',
      toastList: [{ id: 0, backgroundColor: '#5cb85c', icon: checkIcon, description: 'This is a message' }],
      autoDelete: false,
      autoDeleteTime: 0
    };
    const { rerender } = render(<Toast {...props} />);
    expect(screen.queryAllByTestId('toast-notification').length).toEqual(1);
    props.autoDelete = true;
    props.autoDeleteTime = 100;
    act(() => {
      jest.runOnlyPendingTimers();
    });
    rerender(<Toast {...props} />);
    await waitFor(() => expect(screen.queryAllByTestId('toast-notification').length).toEqual(0));
  });
});

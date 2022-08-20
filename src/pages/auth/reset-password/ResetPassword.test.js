import { resetPasswordMockError } from '@mocks/handlers/auth';
import { server } from '@mocks/server';
import ResetPassword from '@pages/auth/reset-password/ResetPassword';
import { render, screen, waitFor } from '@root/test.utils';
import userEvent from '@testing-library/user-event';
import { createBrowserHistory } from 'history';
import { createSearchParams } from 'react-router-dom';

describe('ResetPassword', () => {
  beforeEach(() => {
    const url = `/reset-password?${createSearchParams({
      token: '1234567890'
    })}`;
    const history = createBrowserHistory();
    history.push(url);
  });

  it('should have password inputs', () => {
    render(<ResetPassword />);
    const newPasswordLabel = screen.getByLabelText('New Password');
    const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
    expect(newPasswordLabel).toBeInTheDocument();
    expect(confirmPasswordLabel).toBeInTheDocument();
  });

  it('button should be disabled', () => {
    render(<ResetPassword />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });

  it('should have "Back to Login" text', () => {
    render(<ResetPassword />);
    const spanElement = screen.getByText('Back to Login');
    expect(spanElement).toBeInTheDocument();
  });

  it('should be enabled with input', () => {
    render(<ResetPassword />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();

    const newPasswordLabel = screen.getByLabelText('New Password');
    const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
    userEvent.type(newPasswordLabel, 'qwerty1');
    userEvent.type(confirmPasswordLabel, 'qwerty1');
    expect(buttonElement).toBeEnabled();
  });

  it('should change label when clicked', async () => {
    render(<ResetPassword />);
    const buttonElement = screen.getByRole('button');
    const newPasswordLabel = screen.getByLabelText('New Password');
    const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
    userEvent.type(newPasswordLabel, 'qwerty1');
    userEvent.type(confirmPasswordLabel, 'qwerty1');

    userEvent.click(buttonElement);

    const newButtonElement = screen.getByRole('button');
    expect(newButtonElement.textContent).toEqual('RESET PASSWORD IN PROGRESS...');
    await waitFor(() => {
      const newButtonElement1 = screen.getByRole('button');
      expect(newButtonElement1.textContent).toEqual('RESET PASSWORD');
    });
  });

  describe('Success', () => {
    it('should display success alert', async () => {
      render(<ResetPassword />);
      const buttonElement = screen.getByRole('button');
      const newPasswordLabel = screen.getByLabelText('New Password');
      const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
      userEvent.type(newPasswordLabel, 'qwerty1');
      userEvent.type(confirmPasswordLabel, 'qwerty1');
      userEvent.click(buttonElement);

      const alert = await screen.findByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass('alert-success');
      expect(alert.textContent).toEqual('Password successfully updated.');
    });
  });

  describe('Error', () => {
    it('should display error alert and border', async () => {
      server.use(resetPasswordMockError);
      render(<ResetPassword />);
      const buttonElement = screen.getByRole('button');
      const newPasswordLabel = screen.getByLabelText('New Password');
      const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
      userEvent.type(newPasswordLabel, 'qwerty1');
      userEvent.type(confirmPasswordLabel, 'qwerty');
      userEvent.click(buttonElement);

      const alert = await screen.findByRole('alert');
      expect(alert).toBeInTheDocument();
      await waitFor(() => expect(newPasswordLabel).toHaveStyle({ border: '1px solid #fa9b8a' }));
      await waitFor(() => expect(newPasswordLabel).toHaveStyle({ border: '1px solid #fa9b8a' }));
      expect(alert).toHaveClass('alert-error');
      expect(alert.textContent).toEqual('Passwords do not match');
    });
  });
});

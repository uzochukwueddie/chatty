import ChangePassword from '@components/change-password/ChangePassword';
import { render, screen, waitFor } from '@root/test.utils';
import userEvent from '@testing-library/user-event';

describe('ChangePassword', () => {
  it('should have its input elements', () => {
    render(<ChangePassword />);
    const currentPasswordLabel = screen.getByLabelText('Current Password');
    const newPasswordLabel = screen.getByLabelText('New Password');
    const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
    expect(currentPasswordLabel).toBeInTheDocument();
    expect(newPasswordLabel).toBeInTheDocument();
    expect(confirmPasswordLabel).toBeInTheDocument();
  });

  it('should have button disabled', () => {
    render(<ChangePassword />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });

  it('should have button enabled with inputs', () => {
    render(<ChangePassword />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();

    const currentPasswordLabel = screen.getByLabelText('Current Password');
    const newPasswordLabel = screen.getByLabelText('New Password');
    const confirmPasswordLabel = screen.getByLabelText('Confirm Password');

    userEvent.type(currentPasswordLabel, 'querty');
    userEvent.type(newPasswordLabel, 'qwerty1');
    userEvent.type(confirmPasswordLabel, 'qwerty1');

    expect(buttonElement).toBeEnabled();
  });

  it('should have eye slash icon', () => {
    render(<ChangePassword />);
    const eyeIconElement = screen.queryByTestId('eye-icon');
    expect(eyeIconElement).toBeInTheDocument();
  });

  it('should change eye icon', () => {
    render(<ChangePassword />);
    const eyeElement = screen.queryByTestId('eye-icon');
    const eyeSlashIcon = eyeElement.childNodes.item(0);
    userEvent.click(eyeElement);
    const updatedEyeElement = screen.queryByTestId('eye-icon');
    const eyeIcon = updatedEyeElement.childNodes.item(0);
    expect(eyeSlashIcon).not.toEqual(eyeIcon);
  });

  it('should change input type from password to text', () => {
    render(<ChangePassword />);
    const eyeElement = screen.queryByTestId('eye-icon');
    const newPasswordLabel = screen.getByLabelText('New Password');
    expect(newPasswordLabel).toHaveAttribute('type', 'password');
    userEvent.click(eyeElement);
    expect(newPasswordLabel).toHaveAttribute('type', 'text');
  });

  it('should have empty fields after button submit', async () => {
    render(<ChangePassword />);

    const buttonElement = screen.getByRole('button');
    const currentPasswordLabel = screen.getByLabelText('Current Password');
    const newPasswordLabel = screen.getByLabelText('New Password');
    const confirmPasswordLabel = screen.getByLabelText('Confirm Password');

    userEvent.type(currentPasswordLabel, 'querty');
    userEvent.type(newPasswordLabel, 'qwerty1');
    userEvent.type(confirmPasswordLabel, 'qwerty1');

    userEvent.click(buttonElement);

    await waitFor(() => expect(currentPasswordLabel).toHaveValue(''));
    await waitFor(() => expect(newPasswordLabel).toHaveValue(''));
    await waitFor(() => expect(confirmPasswordLabel).toHaveValue(''));
  });
});

import { forgotPasswordMockError } from '@mocks/handlers/auth';
import { server } from '@mocks/server';
import ForgotPassword from '@pages/auth/forgot-password/ForgotPassword';
import { render, screen, waitFor } from '@root/test.utils';
import userEvent from '@testing-library/user-event';

describe('ForgotPassword', () => {
  it('form should have email label', () => {
    render(<ForgotPassword />);
    const emailLabel = screen.getByLabelText('Email');
    expect(emailLabel).toBeInTheDocument();
  });

  it('should have "Back to Login" text', () => {
    render(<ForgotPassword />);
    const spanElement = screen.getByText('Back to Login');
    expect(spanElement).toBeInTheDocument();
  });

  describe('Button', () => {
    it('button should be disabled', () => {
      render(<ForgotPassword />);
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeDisabled();
    });

    it('should be enabled with input', () => {
      render(<ForgotPassword />);
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeDisabled();

      const emailElement = screen.getByLabelText('Email');
      userEvent.type(emailElement, 'manny@test.com');
      expect(buttonElement).toBeEnabled();
    });

    it('should change label when clicked', async () => {
      render(<ForgotPassword />);
      const buttonElement = screen.getByRole('button');
      const emailElement = screen.getByLabelText('Email');
      userEvent.type(emailElement, 'manny@test.com');

      userEvent.click(buttonElement);

      const newButtonElement = screen.getByRole('button');
      expect(newButtonElement.textContent).toEqual('FORGOT PASSWORD IN PROGRESS...');
      await waitFor(() => {
        const newButtonElement1 = screen.getByRole('button');
        expect(newButtonElement1.textContent).toEqual('FORGOT PASSWORD');
      });
    });
  });

  describe('Success', () => {
    it('should display success alert', async () => {
      render(<ForgotPassword />);
      const buttonElement = screen.getByRole('button');
      const emailElement = screen.getByLabelText('Email');
      userEvent.type(emailElement, 'manny');
      userEvent.click(buttonElement);

      const alert = await screen.findByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass('alert-success');
      expect(alert.textContent).toEqual('Password reset email sent.');
    });
  });

  describe('Error', () => {
    it('should display error alert and border', async () => {
      server.use(forgotPasswordMockError);
      render(<ForgotPassword />);
      const buttonElement = screen.getByRole('button');
      const emailElement = screen.getByLabelText('Email');
      userEvent.type(emailElement, 'manny');
      userEvent.click(buttonElement);

      const alert = await screen.findByRole('alert');
      expect(alert).toBeInTheDocument();
      await waitFor(() => expect(emailElement).toHaveStyle({ border: '1px solid #fa9b8a' }));
      expect(alert).toHaveClass('alert-error');
      expect(alert.textContent).toEqual('Field must be valid');
    });
  });
});

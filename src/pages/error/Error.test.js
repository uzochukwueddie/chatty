import Error from '@pages/error/Error';
import { render, screen } from '@root/test.utils';

describe('Error', () => {
  test('page should have its texts', () => {
    render(<Error />);
    const oopsText = screen.getByText(/oops/i);
    const error404Text = screen.getByText(/error 404/i);
    const backHomeText = screen.getByText(/back home/i);
    expect(oopsText).toBeInTheDocument();
    expect(error404Text).toBeInTheDocument();
    expect(backHomeText).toBeInTheDocument();
  });

  test('page should have a button', () => {
    render(<Error />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeEnabled();
  });
});

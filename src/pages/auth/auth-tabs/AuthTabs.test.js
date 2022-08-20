import AuthTabs from '@pages/auth/auth-tabs/AuthTabs';
import { fireEvent, render, screen, within } from '@root/test.utils';

describe('Authtabs', () => {
  it('signin tab should be displayed', () => {
    render(<AuthTabs />);
    const listElement = screen.getByRole('list');
    const { getAllByRole } = within(listElement);
    const items = getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Sign In');
    expect(items[0]).toHaveClass('active');
  });

  it('sign up tab should be displayed', () => {
    render(<AuthTabs />);
    const listElement = screen.getByRole('list');
    const { getAllByRole } = within(listElement);
    const items = getAllByRole('listitem');
    fireEvent.click(items[1]);
    expect(items[1]).toHaveTextContent('Sign Up');
    expect(items[1]).toHaveClass('active');
  });
});

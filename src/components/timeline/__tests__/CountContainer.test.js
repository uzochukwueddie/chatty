import CountContainer from '@components/timeline/CountContainer';
import { render, screen } from '@root/test.utils';

describe('CountContainer', () => {
  it('should display skeleton', async () => {
    const props = {
      loading: true,
      followersCount: undefined,
      followingCount: undefined
    };
    render(<CountContainer {...props} />);
    const countContainer = screen.queryByTestId('count-container-skeleton');
    expect(countContainer).toBeInTheDocument();
  });

  it('should display shortened non-zero values', () => {
    const props = {
      loading: false,
      followersCount: 537377372,
      followingCount: 36362636
    };
    render(<CountContainer {...props} />);
    const items = screen.queryAllByTestId('info');
    expect(items[0].textContent).toEqual('537.4M');
    expect(items[1].textContent).toEqual('36.4M');
  });
});

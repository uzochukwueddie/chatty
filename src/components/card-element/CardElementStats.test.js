import CardElementStats from '@components/card-element/CardElementStats';
import { render, screen } from '@root/test.utils';

describe('CardElementStats', () => {
  it('should display zeros', () => {
    const props = {
      postsCount: undefined,
      followersCount: undefined,
      followingCount: undefined
    };
    render(<CardElementStats {...props} />);
    const h5Elements = screen.queryAllByTestId('info');
    expect(h5Elements[0].textContent).toEqual('0');
    expect(h5Elements[1].textContent).toEqual('0');
    expect(h5Elements[2].textContent).toEqual('0');
  });

  it('should display shortened non-zero values', () => {
    const props = {
      postsCount: 23464657,
      followersCount: 537377372,
      followingCount: 36362636
    };
    render(<CardElementStats {...props} />);
    const h5Elements = screen.queryAllByTestId('info');
    expect(h5Elements[0].textContent).toEqual('23.5M');
    expect(h5Elements[1].textContent).toEqual('537.4M');
    expect(h5Elements[2].textContent).toEqual('36.4M');
  });
});

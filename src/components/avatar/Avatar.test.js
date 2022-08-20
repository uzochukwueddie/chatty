import Avatar from '@components/avatar/Avatar';
import { render, screen } from '@root/test.utils';

describe('Avatar', () => {
  describe('with no image src', () => {
    let props;
    beforeEach(() => {
      props = {
        avatarSrc: '',
        name: 'Martin',
        bgColor: 'green',
        textColor: 'white',
        size: 40
      };
    });

    it('should render div with background color', () => {
      render(<Avatar {...props} />);
      const divElement = screen.getByTestId('avatar-container');
      const divElementStyles = window.getComputedStyle(divElement);
      expect(divElementStyles.backgroundColor).toBe('green');
      expect(divElementStyles.width).toBe('40px');
      expect(divElementStyles.height).toBe('40px');
    });

    it('should have first letter of name', () => {
      render(<Avatar {...props} />);
      const avatarNameElement = screen.getByTestId('avatar-name');
      const avatarNameElementStyles = window.getComputedStyle(avatarNameElement);
      expect(avatarNameElement.textContent).toBe('M');
      expect(avatarNameElementStyles.textTransform).toBe('uppercase');
    });
  });

  describe('with image src', () => {
    let props;
    beforeEach(async () => {
      props = {
        avatarSrc: 'https://place-hold.it',
        name: 'Martin',
        bgColor: 'green',
        textColor: 'white',
        size: 40
      };
    });

    it('should render img', () => {
      render(<Avatar {...props} />);
      const imgElement = screen.getByRole('img');
      expect(imgElement).toBeInTheDocument();
    });

    it('should have image src', () => {
      render(<Avatar {...props} />);
      const imgElement = screen.getByRole('img');
      expect(imgElement).toHaveAttribute('src', 'https://place-hold.it');
    });
  });
});

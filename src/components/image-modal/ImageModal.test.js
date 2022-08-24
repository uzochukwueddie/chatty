import ImageModal from '@components/image-modal/ImageModal';
import { render, screen } from '@root/test.utils';

describe('ImageModal', () => {
  let props;
  beforeEach(() => {
    props = {
      image: 'https://place-hold.it',
      onCancel: jest.fn(),
      onClickLeft: jest.fn(),
      onClickRight: jest.fn(),
      showArrow: false,
      lastItemRight: false,
      lastItemLeft: false
    };
  });
  it('should display image', () => {
    render(<ImageModal {...props} />);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
  });

  it('should display left and right arrows', () => {
    props.showArrow = true;
    const { baseElement } = render(<ImageModal {...props} />);
    const leftArrowElement = baseElement.querySelector('.image-modal-icon-left');
    const rightArrowElement = baseElement.querySelector('.image-modal-icon-right');
    expect(leftArrowElement).toBeInTheDocument();
    expect(rightArrowElement).toBeInTheDocument();
  });
});

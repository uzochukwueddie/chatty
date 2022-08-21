import NotificationPreview from '@components/dialog/NotificationPreview';
import { render, screen } from '@root/test.utils';
import userEvent from '@testing-library/user-event';

describe('NotificationPreview', () => {
  const buttonClick = jest.fn();

  it('should have only button', () => {
    const props = {
      title: '',
      post: '',
      imgUrl: '',
      comment: '',
      reaction: '',
      senderName: '',
      secondButtonText: 'Button 1',
      secondBtnHandler: jest.fn()
    };
    render(<NotificationPreview {...props} />);
    const buttonOne = screen.getByText('Button 1');
    expect(buttonOne).toBeInTheDocument();
  });

  it('should have other elements', () => {
    const props = {
      title: 'Title',
      post: 'This is my post',
      imgUrl: 'https://place-hold.it',
      comment: 'comment',
      reaction: 'love',
      senderName: 'Danny',
      secondButtonText: 'Button 1',
      secondBtnHandler: null
    };
    render(<NotificationPreview {...props} />);
    const title = screen.getByText('Title');
    const post = screen.getByText('This is my post');
    const imgElement = screen.getAllByRole('img');
    const comment = screen.getByText('comment');
    const reaction = screen.getByTestId('reaction');

    expect(title).toBeInTheDocument();
    expect(post).toBeInTheDocument();
    expect(comment).toBeInTheDocument();
    expect(imgElement[0]).toHaveAttribute('src', 'https://place-hold.it');
    expect(reaction.childNodes[0].textContent).toBe('Danny reacted on your post with');
    expect(imgElement[1]).toHaveAttribute('src', 'love.png');
  });

  it('should handle click', () => {
    render(<NotificationPreview secondButtonText="Button 1" secondBtnHandler={buttonClick} />);
    const buttonOne = screen.getByText('Button 1');
    userEvent.click(buttonOne);
    expect(buttonClick).toHaveBeenCalledTimes(1);
  });
});

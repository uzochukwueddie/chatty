import Dialog from '@components/dialog/Dialog';
import { render, screen } from '@root/test.utils';
import userEvent from '@testing-library/user-event';

describe('Dialog', () => {
  let props;
  const buttonOneClick = jest.fn();
  const buttonTwoClick = jest.fn();
  beforeEach(() => {
    props = {
      title: 'Dialog text',
      firstButtonText: 'Button 1',
      secondButtonText: 'Button 2',
      firstBtnHandler: buttonOneClick,
      secondBtnHandler: buttonTwoClick
    };
  });

  it('should display its elements', () => {
    render(<Dialog {...props} />);
    const title = screen.getByText('Dialog text');
    const buttonOne = screen.getByText('Button 1');
    const buttonTwo = screen.getByText('Button 2');
    expect(title).toBeInTheDocument();
    expect(buttonOne).toBeInTheDocument();
    expect(buttonTwo).toBeInTheDocument();
  });

  it('should handle click', () => {
    render(<Dialog {...props} />);
    const buttonOne = screen.getByText('Button 1');
    const buttonTwo = screen.getByText('Button 2');
    userEvent.click(buttonOne);
    userEvent.click(buttonTwo);
    expect(buttonOneClick).toHaveBeenCalledTimes(1);
    expect(buttonTwoClick).toHaveBeenCalledTimes(1);
  });
});

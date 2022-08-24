import CardElementButtons from '@components/card-element/CardElementButtons';
import { render, screen } from '@root/test.utils';
import userEvent from '@testing-library/user-event';

describe('CardElementButtons', () => {
  it('should display two buttons', () => {
    const props = {
      isChecked: false,
      btnTextOne: 'Button 1',
      btnTextTwo: 'Button 2',
      onClickBtnOne: null,
      onClickBtnTwo: null,
      onNavigateToProfile: null
    };
    render(<CardElementButtons {...props} />);
    const buttonElements = screen.queryAllByRole('button');
    const buttonOne = screen.getByText('Button 1');
    const buttonTwo = screen.getByText('Profile');
    expect(buttonElements.length).toEqual(2);
    expect(buttonOne).toBeInTheDocument();
    expect(buttonTwo).toBeInTheDocument();
  });

  it('should handle clicks', async () => {
    const buttonOneClick = jest.fn();
    const profileButtonClick = jest.fn();
    const props = {
      isChecked: false,
      btnTextOne: 'Button 1',
      btnTextTwo: 'Button 2',
      onClickBtnOne: buttonOneClick,
      onClickBtnTwo: null,
      onNavigateToProfile: profileButtonClick
    };
    render(<CardElementButtons {...props} />);
    const buttonElements = screen.queryAllByRole('button');
    userEvent.click(buttonElements[0]);
    userEvent.click(buttonElements[1]);
    expect(buttonOneClick).toHaveBeenCalledTimes(1);
    expect(profileButtonClick).toHaveBeenCalledTimes(1);
  });

  it('should handle button 2 click', () => {
    const buttonOneClick = jest.fn();
    const props = {
      btnTextOne: 'Button 1',
      btnTextTwo: 'Button 2',
      onClickBtnTwo: buttonOneClick
    };
    const { rerender } = render(<CardElementButtons {...props} />);
    rerender(<CardElementButtons isChecked={true} {...props} />);
    const buttonElements = screen.queryAllByRole('button');
    userEvent.click(buttonElements[0]);
    expect(buttonElements[0].textContent).toEqual('Button 2');
    expect(buttonOneClick).toHaveBeenCalledTimes(1);
  });
});

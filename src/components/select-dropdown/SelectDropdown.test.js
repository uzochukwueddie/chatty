import ModalBoxContent from '@components/posts/post-modal/modal-box-content/ModalBoxContent';
import SelectDropdown from '@components/select-dropdown/SelectDropdown';
import { render, screen, within } from '@root/test.utils';
import { privacyList } from '@services/utils/static.data';
import userEvent from '@testing-library/user-event';

describe('SelectDropdown', () => {
  it('should have empty list', () => {
    const props = {
      isActive: false,
      setSelectedItem: null
    };
    render(<SelectDropdown {...props} />);
    const listElement = screen.getByRole('list');
    expect(listElement.childElementCount).toEqual(0);
  });

  it('should not have empty list', () => {
    const props = {
      isActive: false,
      setSelectedItem: null,
      items: privacyList
    };
    render(<SelectDropdown {...props} />);
    const listElement = screen.getByRole('list');
    expect(listElement.childElementCount).toBeGreaterThan(0);
  });

  it('should have list items', () => {
    const props = {
      isActive: false,
      setSelectedItem: null,
      items: privacyList
    };
    render(<SelectDropdown {...props} />);
    const listElement = screen.getByRole('list');
    const topText = screen.getByText(/public/i);
    const subText = screen.getByText(/anyone/i);
    const icons = listElement.querySelector('.menu-icon');
    expect(topText).toBeInTheDocument();
    expect(subText).toBeInTheDocument();
    expect(icons).toBeInTheDocument();
  });

  it('should handle click', () => {
    const onClick = jest.fn().mockImplementation((element) => element);
    const props = {
      isActive: false,
      setSelectedItem: onClick,
      items: privacyList
    };
    render(<SelectDropdown {...props} />);
    const listElement = screen.getByRole('list');
    const { getAllByRole } = within(listElement);
    const items = getAllByRole('listitem');
    userEvent.click(items[0]);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(privacyList[0]);
  });

  it('should display selected item', () => {
    const onClick = jest.fn().mockImplementation((element) => element);
    const props = {
      isActive: false,
      setSelectedItem: onClick,
      items: privacyList
    };
    render(<SelectDropdown {...props} />);
    const { container } = render(<ModalBoxContent />);
    const listElement = screen.queryAllByTestId('select-dropdown');
    userEvent.click(listElement[0]);
    const selectedItem = container.querySelector('.time-text-display');
    const selectedItemText = container.querySelector('.selected-item-text');
    expect(selectedItem).toBeInTheDocument();
    expect(selectedItemText).toBeInTheDocument();
    expect(selectedItemText.textContent).toEqual('Public');
  });
});

import NotificationSettings from '@components/notification-settings/NotificationSettings';
import { existingUser } from '@mocks/data/user.mock';
import { addUser } from '@redux/reducers/user/user.reducer';
import { store } from '@redux/store';
import { render, screen } from '@root/test.utils';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('NotificationSettings', () => {
  beforeEach(() => {
    act(() => {
      store.dispatch(addUser({ token: '123456', profile: existingUser }));
    });
  });

  it('should display notification settings items', async () => {
    render(<NotificationSettings />);
    const settingsItems = await screen.findAllByTestId('notification-settings-item');
    expect(settingsItems.length).toEqual(4);
    settingsItems.forEach((item) => expect(item).toBeInTheDocument());
  });

  it('should have buttons toggled by default', async () => {
    render(<NotificationSettings />);
    const checkBoxElement = await screen.findAllByTestId('toggle');
    expect(checkBoxElement[0].childNodes.item(0)).toBeChecked();
    expect(checkBoxElement[1].childNodes.item(0)).toBeChecked();
    expect(checkBoxElement[2].childNodes.item(0)).toBeChecked();
    expect(checkBoxElement[3].childNodes.item(0)).toBeChecked();
  });

  it('should button toggled by click', async () => {
    render(<NotificationSettings />);
    const checkBoxElement = await screen.findAllByTestId('toggle');
    expect(checkBoxElement[0].childNodes.item(0)).toBeChecked();
    userEvent.click(checkBoxElement[0].childNodes.item(0));
    expect(checkBoxElement[0].childNodes.item(0)).not.toBeChecked();
  });
});

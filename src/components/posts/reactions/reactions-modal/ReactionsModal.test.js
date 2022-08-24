import ReactionsModal from '@components/posts/reactions/reactions-modal/ReactionsModal';
import { postMockData } from '@mocks/data/post.mock';
import { updatePostItem } from '@redux/reducers/post/post.reducer';
import { store } from '@redux/store';
import { render, screen, within, waitFor } from '@root/test.utils';
import { Utils } from '@services/utils/utils.service';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('ReactionsModal', () => {
  beforeEach(() => {
    act(() => {
      store.dispatch(updatePostItem(postMockData));
    });
  });

  it('should have modal wrapper', async () => {
    render(<ReactionsModal />);
    let wrapper;
    let modalBg;
    let modalBody;
    await act(() => {
      wrapper = screen.queryByTestId('modal-wrapper');
      modalBg = screen.queryByTestId('modal-bg');
      modalBody = screen.queryByTestId('modal-body');
    });
    await waitFor(() => {
      expect(wrapper).toBeInTheDocument();
      expect(modalBg).toBeInTheDocument();
      expect(modalBody).toBeInTheDocument();
    });
  });

  it('should have list items tabs', async () => {
    let items = [];
    render(<ReactionsModal />);
    await act(() => {
      const listElement = screen.getByRole('list');
      const { getAllByRole } = within(listElement);
      items = getAllByRole('listitem');
    });
    await waitFor(() => {
      expect(items[0].textContent).toEqual('All');
      expect(items[1].childNodes.item(0)).toHaveAttribute('src', 'like.png');
      expect(items[1].childNodes.item(1).textContent).toEqual('1');
      expect(items[2].childNodes.item(0)).toHaveAttribute('src', 'love.png');
      expect(items[2].childNodes.item(1).textContent).toEqual('2');
    });
  });

  it('should have reaction list items', async () => {
    render(<ReactionsModal />);
    const listElement = screen.getByRole('list');
    const { getAllByRole } = within(listElement);
    const items = getAllByRole('listitem');
    await act(() => {
      userEvent.click(items[0]);
    });

    await waitFor(() => {
      const reactionListElement = screen.queryAllByTestId('reaction-list');
      expect(reactionListElement.length).toEqual(Utils.formattedReactions(postMockData.reactions).length);
    });
  });
});

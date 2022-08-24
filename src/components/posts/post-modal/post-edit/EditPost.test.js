import EditPost from '@components/posts/post-modal/post-edit/EditPost';
import { editPostMockData } from '@mocks/data/post.mock';
import { existingUser } from '@mocks/data/user.mock';
import { updatePostItem } from '@redux/reducers/post/post.reducer';
import { addUser } from '@redux/reducers/user/user.reducer';
import { store } from '@redux/store';
import { render, screen } from '@root/test.utils';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers();

describe('EditPost', () => {
  beforeEach(() => {
    act(() => {
      store.dispatch(updatePostItem(editPostMockData));
      store.dispatch(addUser({ token: '123456', profile: existingUser }));
    });
  });

  afterEach(() => {
    editPostMockData.gifUrl = '';
  });

  it('should display have edit post text', async () => {
    render(<EditPost />);
    const editPostHeader = await screen.findByText(/edit post/i);
    expect(editPostHeader).toBeInTheDocument();
  });

  it('should display modal box content', async () => {
    render(<EditPost />);
    const modalBoxContent = await screen.findByTestId('modal-box-content');
    expect(modalBoxContent).toBeInTheDocument();
  });

  it('should have background colors for selection', async () => {
    render(<EditPost />);
    const bgColors = await screen.findAllByTestId('bg-colors');
    bgColors.forEach((color) => expect(color).toBeInTheDocument());
  });

  it('should automatically set background color of modal box form', async () => {
    render(<EditPost />);
    const modalBoxForm = await screen.findByTestId('modal-box-form');
    expect(modalBoxForm).toHaveStyle({ background: 'rgb(244, 67, 54)' });
  });

  it('should change background color of modal box form to default', async () => {
    render(<EditPost />);
    const bgColors = await screen.findAllByTestId('bg-colors');
    const modalBoxForm = await screen.findByTestId('modal-box-form');
    userEvent.click(bgColors[0]);
    expect(modalBoxForm).toHaveStyle({ background: 'rgb(255, 255, 255)' });
  });

  it('should have post input contenteditable and have focus', async () => {
    render(<EditPost />);
    const editableElement = await screen.findByTestId('editable');
    expect(editableElement).toHaveAttribute('contentEditable', 'true');
    expect(editableElement).toHaveFocus();
  });

  it('should have post displayed', async () => {
    render(<EditPost />);
    act(() => {
      jest.runAllTimers();
    });
    const editableElement = await screen.findByTestId('editable');
    expect(editableElement.textContent).toEqual(editPostMockData.post);
  });

  it('should display image', async () => {
    editPostMockData.gifUrl = 'https://place-hold.it/500x500';
    act(() => {
      store.dispatch(updatePostItem(editPostMockData));
    });
    render(<EditPost />);
    const postEditableInput = await screen.findByTestId('post-editable');
    const postImage = await screen.findByTestId('post-image');
    expect(postImage).toHaveAttribute('src', 'https://place-hold.it/500x500');
    expect(postEditableInput).toHaveFocus();
  });

  it('should remove image', async () => {
    editPostMockData.gifUrl = 'https://place-hold.it/500x500';
    act(() => {
      store.dispatch(updatePostItem(editPostMockData));
    });
    render(<EditPost />);
    const imageDeleteBtn = await screen.findByTestId('image-delete-btn');
    const postImage = await screen.findByTestId('post-image');
    expect(postImage).toHaveAttribute('src', 'https://place-hold.it/500x500');
    userEvent.click(imageDeleteBtn);
    const samePostImage = screen.queryByTestId('post-image');
    expect(samePostImage).not.toBeInTheDocument();
  });

  it('should changed allowed number of characters', async () => {
    const post = 'this is a good day.';
    render(<EditPost />);
    const editableElement = await screen.findByTestId('editable');
    userEvent.type(editableElement, post);
    const allowedNumberOfCharacters = await screen.findByTestId('allowed-number');
    expect(allowedNumberOfCharacters.textContent).toEqual(`${100 - post.length}/100`);
  });

  it('should display modal box selection', async () => {
    render(<EditPost />);
    const modalBoxSelection = await screen.findByTestId('modal-box-selection');
    expect(modalBoxSelection).toBeInTheDocument();
  });

  it('should have update post button', async () => {
    render(<EditPost />);
    const buttonElement = await screen.findByTestId('edit-button');
    expect(buttonElement.childNodes.item(0)).toBeInTheDocument();
  });
});

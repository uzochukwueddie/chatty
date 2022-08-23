import AddPost from '@components/posts/post-modal/post-add/AddPost';
import { postMockData } from '@mocks/data/post.mock';
import { existingUser } from '@mocks/data/user.mock';
import { updatePostItem } from '@redux/reducers/post/post.reducer';
import { addUser } from '@redux/reducers/user/user.reducer';
import { store } from '@redux/store';
import { render, screen } from '@root/test.utils';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('AddPost', () => {
  beforeEach(() => {
    act(() => {
      store.dispatch(updatePostItem(postMockData));
      store.dispatch(addUser({ token: '123456', profile: existingUser }));
    });
  });

  afterEach(() => {
    postMockData.gifUrl = '';
  });

  it('should display modal box content', async () => {
    render(<AddPost selectedImage="" />);
    const modalBoxContent = await screen.findByTestId('modal-box-content');
    expect(modalBoxContent).toBeInTheDocument();
  });

  it('should display modal box form with white background', async () => {
    render(<AddPost selectedImage="" />);
    const modalBoxForm = await screen.findByTestId('modal-box-form');
    expect(modalBoxForm).toBeInTheDocument();
    expect(modalBoxForm).toHaveStyle({ background: 'rgb(255, 255, 255)' });
  });

  it('should have background colors for selection', async () => {
    render(<AddPost selectedImage="" />);
    const bgColors = await screen.findAllByTestId('bg-colors');
    bgColors.forEach((color) => expect(color).toBeInTheDocument());
  });

  it('should change background color of modal box form', async () => {
    render(<AddPost selectedImage="" />);
    const bgColors = await screen.findAllByTestId('bg-colors');
    const modalBoxForm = await screen.findByTestId('modal-box-form');
    userEvent.click(bgColors[1]);
    expect(modalBoxForm).toHaveStyle({ background: 'rgb(244, 67, 54)' });
  });

  it('should have post input contenteditable and have focus', async () => {
    render(<AddPost selectedImage="" />);
    const editableElement = await screen.findByTestId('editable');
    expect(editableElement).toHaveAttribute('contentEditable', 'true');
    expect(editableElement).toHaveFocus();
  });

  it('should display post and image', async () => {
    postMockData.gifUrl = 'https://place-hold.it/500x500';
    act(() => {
      store.dispatch(updatePostItem(postMockData));
    });
    render(<AddPost selectedImage="" />);
    const postEditableInput = await screen.findByTestId('post-editable');
    const postImage = await screen.findByTestId('post-image');
    postEditableInput.textContent = 'testing';
    expect(postImage).toHaveAttribute('src', 'https://place-hold.it/500x500');
    expect(postEditableInput).toHaveFocus();
    expect(postEditableInput.textContent).toEqual('testing');
  });

  it('should remove image', async () => {
    postMockData.gifUrl = 'https://place-hold.it/500x500';
    act(() => {
      store.dispatch(updatePostItem(postMockData));
    });
    render(<AddPost selectedImage="" />);
    const imageDeleteBtn = await screen.findByTestId('image-delete-btn');
    const postImage = await screen.findByTestId('post-image');
    expect(postImage).toHaveAttribute('src', 'https://place-hold.it/500x500');
    userEvent.click(imageDeleteBtn);
    const samePostImage = screen.queryByTestId('post-image');
    expect(samePostImage).not.toBeInTheDocument();
  });

  it('should display default allowed number of characters', async () => {
    render(<AddPost selectedImage="" />);
    const allowedNumberOfCharacters = await screen.findByTestId('allowed-number');
    expect(allowedNumberOfCharacters.textContent).toEqual('100/100');
  });

  it('should changed allowed number of characters', async () => {
    const post = 'this is a good day.';
    render(<AddPost selectedImage="" />);
    const editableElement = await screen.findByTestId('editable');
    userEvent.type(editableElement, post);
    const allowedNumberOfCharacters = await screen.findByTestId('allowed-number');
    expect(allowedNumberOfCharacters.textContent).toEqual(`${100 - post.length}/100`);
  });

  it('should display modal box selection', async () => {
    render(<AddPost selectedImage="" />);
    const modalBoxSelection = await screen.findByTestId('modal-box-selection');
    expect(modalBoxSelection).toBeInTheDocument();
  });

  it('should have post button', async () => {
    postMockData.post = '';
    act(() => {
      store.dispatch(updatePostItem(postMockData));
    });
    render(<AddPost selectedImage="" />);
    const buttonElement = await screen.findByTestId('post-button');
    expect(buttonElement.childNodes.item(0)).toBeInTheDocument();
  });
});

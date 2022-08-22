import reducer, {
  addPostFeeling,
  closeModal,
  openModal,
  toggleCommentsModal,
  toggleDeleteDialog,
  toggleFeelingModal,
  toggleGifModal,
  toggleImageModal,
  toggleReactionsModal
} from '@redux/reducers/modal/modal.reducer';

const initialState = {
  type: '',
  isOpen: false,
  feeling: '',
  image: '',
  data: null,
  feelingIsOpen: false,
  openFileDialog: false,
  gifModalIsOpen: false,
  reactionsModalIsOpen: false,
  commentsModalIsOpen: false,
  deleteDialogIsOpen: false
};

const modalData = {
  type: 'add',
  isOpen: true,
  feeling: 'happy',
  image: 'https://place-hold.it',
  data: { username: 'Matt' },
  feelingIsOpen: true,
  openFileDialog: true,
  gifModalIsOpen: true,
  reactionsModalIsOpen: true,
  commentsModalIsOpen: true,
  deleteDialogIsOpen: true
};

describe('modal reducer', () => {
  beforeEach(() => {
    initialState.type = '';
    initialState.isOpen = false;
    initialState.feeling = '';
    initialState.image = '';
    initialState.data = null;
    initialState.feelingIsOpen = false;
    initialState.openFileDialog = false;
    initialState.gifModalIsOpen = false;
    initialState.reactionsModalIsOpen = false;
    initialState.commentsModalIsOpen = false;
    initialState.deleteDialogIsOpen = false;
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should open modal', () => {
    expect(reducer(initialState, openModal({ type: 'add', data: 'This is a message' }))).toEqual({
      type: 'add',
      isOpen: true,
      feeling: '',
      image: '',
      data: 'This is a message',
      feelingIsOpen: false,
      openFileDialog: false,
      gifModalIsOpen: false,
      reactionsModalIsOpen: false,
      commentsModalIsOpen: false,
      deleteDialogIsOpen: false
    });
  });

  it('should close modal', () => {
    expect(reducer(modalData, closeModal())).toEqual({
      type: '',
      isOpen: false,
      feeling: '',
      image: '',
      data: null,
      feelingIsOpen: false,
      openFileDialog: false,
      gifModalIsOpen: false,
      reactionsModalIsOpen: false,
      commentsModalIsOpen: false,
      deleteDialogIsOpen: false
    });
  });

  it('should add post feeling', () => {
    expect(reducer(initialState, addPostFeeling({ feeling: 'happy' }))).toEqual({
      type: '',
      isOpen: false,
      feeling: 'happy',
      image: '',
      data: null,
      feelingIsOpen: false,
      openFileDialog: false,
      gifModalIsOpen: false,
      reactionsModalIsOpen: false,
      commentsModalIsOpen: false,
      deleteDialogIsOpen: false
    });
  });

  it('should toggleImageModal', () => {
    expect(reducer(initialState, toggleImageModal(true))).toEqual({
      type: '',
      isOpen: false,
      feeling: '',
      image: '',
      data: null,
      feelingIsOpen: false,
      openFileDialog: true,
      gifModalIsOpen: false,
      reactionsModalIsOpen: false,
      commentsModalIsOpen: false,
      deleteDialogIsOpen: false
    });
  });

  it('should toggleFeelingModal', () => {
    expect(reducer(initialState, toggleFeelingModal(true))).toEqual({
      type: '',
      isOpen: false,
      feeling: '',
      image: '',
      data: null,
      feelingIsOpen: true,
      openFileDialog: false,
      gifModalIsOpen: false,
      reactionsModalIsOpen: false,
      commentsModalIsOpen: false,
      deleteDialogIsOpen: false
    });
  });

  it('should toggleGifModal', () => {
    expect(reducer(initialState, toggleGifModal(true))).toEqual({
      type: '',
      isOpen: false,
      feeling: '',
      image: '',
      data: null,
      feelingIsOpen: false,
      openFileDialog: false,
      gifModalIsOpen: true,
      reactionsModalIsOpen: false,
      commentsModalIsOpen: false,
      deleteDialogIsOpen: false
    });
  });

  it('should toggleReactionsModal', () => {
    expect(reducer(initialState, toggleReactionsModal(true))).toEqual({
      type: '',
      isOpen: false,
      feeling: '',
      image: '',
      data: null,
      feelingIsOpen: false,
      openFileDialog: false,
      gifModalIsOpen: false,
      reactionsModalIsOpen: true,
      commentsModalIsOpen: false,
      deleteDialogIsOpen: false
    });
  });

  it('should toggleCommentsModal', () => {
    expect(reducer(initialState, toggleCommentsModal(true))).toEqual({
      type: '',
      isOpen: false,
      feeling: '',
      image: '',
      data: null,
      feelingIsOpen: false,
      openFileDialog: false,
      gifModalIsOpen: false,
      reactionsModalIsOpen: false,
      commentsModalIsOpen: true,
      deleteDialogIsOpen: false
    });
  });

  it('should toggleDeleteDialog', () => {
    expect(reducer(initialState, toggleDeleteDialog({ toggle: true, data: 'deleted data' }))).toEqual({
      type: '',
      isOpen: false,
      feeling: '',
      image: '',
      data: 'deleted data',
      feelingIsOpen: false,
      openFileDialog: false,
      gifModalIsOpen: false,
      reactionsModalIsOpen: false,
      commentsModalIsOpen: false,
      deleteDialogIsOpen: true
    });
  });
});

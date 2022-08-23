import reducer, { addNotification, clearNotification } from '@redux/reducers/notifications/notification.reducer';

let initialState = [];

describe('notification reducer', () => {
  beforeEach(() => {
    initialState = [];
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should add notification', () => {
    expect(reducer(initialState, addNotification({ type: 'success', message: 'This is a success message' }))).toEqual([
      {
        id: 0,
        description: 'This is a success message',
        type: 'success',
        icon: 'check.svg',
        backgroundColor: '#5cb85c'
      }
    ]);
  });

  it('should clear notification', () => {
    initialState = [
      {
        id: 0,
        description: 'This is a success message',
        type: 'success',
        icon: 'check.svg',
        backgroundColor: '#5cb85c'
      }
    ];
    expect(reducer(initialState, clearNotification())).toEqual([]);
  });
});

import ChatWindow from '@components/chat/window/ChatWindow';
import { messageData } from '@mocks/data/chat.mock';
import { existingUser } from '@mocks/data/user.mock';
import { chatMessagesMock } from '@mocks/handlers/chat';
import { server } from '@mocks/server';
import { addToChatList } from '@redux/reducers/chat/chat.reducer';
import { addUser } from '@redux/reducers/user/user.reducer';
import { store } from '@redux/store';
import { render, screen } from '@root/test.utils';
import { createBrowserHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { createSearchParams } from 'react-router-dom';

describe('ChatWindow', () => {
  beforeEach(() => {
    act(() => {
      store.dispatch(addUser({ token: '123456', profile: existingUser }));
      store.dispatch(addToChatList({ isLoading: false, chatList: [messageData] }));
    });
    const url = `/app/social/profile/${existingUser?.username}?${createSearchParams({
      id: existingUser._id,
      uId: existingUser.uId
    })}`;
    const history = createBrowserHistory();
    history.push(url);
    server.use(chatMessagesMock);
  });

  it('should have items displayed', async () => {
    act(() => {
      store.dispatch(addToChatList({ isLoading: true, chatList: [messageData] }));
    });
    render(<ChatWindow />);
    await act(() => {});
    const messageLoading = await screen.findByTestId('message-loading');
    expect(messageLoading).toBeInTheDocument();
  });

  it('should display chat title', async () => {
    render(<ChatWindow />);
    await act(() => {});
    const chatTitle = await screen.findByTestId('chat-title');
    expect(chatTitle).toBeInTheDocument();
  });

  it('should display chat window', async () => {
    render(<ChatWindow />);
    await act(() => {});
    const chatWindow = await screen.findByTestId('message-page');
    expect(chatWindow).toBeInTheDocument();
  });

  it('should display chat input', async () => {
    render(<ChatWindow />);
    await act(() => {});
    const chatInput = await screen.findByTestId('chat-inputarea');
    expect(chatInput).toBeInTheDocument();
  });
});

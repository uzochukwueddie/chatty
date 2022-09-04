import ChatList from '@components/chat/list/ChatList';
import { messageData, messageDataTwo } from '@mocks/data/chat.mock';
import { existingUser } from '@mocks/data/user.mock';
import { addToChatList } from '@redux/reducers/chat/chat.reducer';
import { addUser } from '@redux/reducers/user/user.reducer';
import { store } from '@redux/store';
import { fireEvent, render, screen } from '@root/test.utils';
import { createBrowserHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { createSearchParams } from 'react-router-dom';

describe('ChatList', () => {
  beforeEach(() => {
    act(() => {
      store.dispatch(addUser({ token: '123456', profile: existingUser }));
    });
  });

  it('should have chat list elements', async () => {
    render(<ChatList />);
    const chatListContainer = await screen.findByTestId('chatList');
    expect(chatListContainer).toBeInTheDocument();
  });

  it('should display user image and username', () => {
    const { baseElement } = render(<ChatList />);
    const headerImage = baseElement.querySelector('.header-img');
    const titleElement = baseElement.querySelector('.title-text');
    expect(headerImage).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(headerImage.childNodes.item(0)).toHaveAttribute('src', 'http://place-hold.it/500x500');
    expect(titleElement.textContent).toEqual(existingUser.username);
  });

  it('should display search input', async () => {
    render(<ChatList />);
    const searchInput = screen.getByPlaceholderText('Search');
    const searchContainer = await screen.findByTestId('search-container');
    fireEvent.change(searchInput, { target: { value: 'dog' } });
    expect(searchContainer.childNodes.length).toEqual(3);
  });

  it('should render chat list', async () => {
    render(<ChatList />);
    act(() => {
      store.dispatch(addToChatList({ isLoading: false, chatList: [messageData] }));
    });
    const conversationItems = await screen.findAllByTestId('conversation-item');
    expect(conversationItems.length).toEqual(1);
    expect(conversationItems[0]).toHaveTextContent(/danny/i);
  });

  it('should have active class on selected item', async () => {
    const url = `/app/social/chat/messages?${createSearchParams({ username: 'danny', id: '123456' })}`;
    const history = createBrowserHistory();
    history.push(url);
    render(<ChatList />);
    act(() => {
      store.dispatch(addToChatList({ isLoading: false, chatList: [messageData] }));
    });
    const conversationItems = await screen.findAllByTestId('conversation-item');
    expect(conversationItems[0]).toHaveClass('active');
  });

  it('should chat chat url when an item is clicked', async () => {
    const url = `/app/social/chat/messages?${createSearchParams({ username: 'danny', id: '123456' })}`;
    const history = createBrowserHistory();
    history.push(url);
    render(<ChatList />);
    act(() => {
      store.dispatch(addToChatList({ isLoading: false, chatList: [messageData, messageDataTwo] }));
    });
    const conversationItems = await screen.findAllByTestId('conversation-item');
    fireEvent.click(conversationItems[1]);

    const newUrl = `${window.location.pathname}${window.location.search}`;
    const chatUrl = `/app/social/chat/messages?${createSearchParams({
      username: messageDataTwo.receiverUsername.toLowerCase(),
      id: messageDataTwo.receiverId
    })}`;
    expect(newUrl).toEqual(chatUrl);
  });

  it('should display new search item at the top of list', async () => {
    const url = `/app/social/chat/messages?${createSearchParams({ username: 'danny', id: '123456' })}`;
    const history = createBrowserHistory();
    history.push(url);
    render(<ChatList />);
    act(() => {
      store.dispatch(addToChatList({ isLoading: false, chatList: [messageDataTwo, messageData] }));
    });
    const conversationItems = await screen.findAllByTestId('conversation-item');
    expect(conversationItems[0]).toHaveTextContent(/kenny/i);
  });
});

import MessageDisplay from '@components/chat/window/message-display/MessageDisplay';
import useOnClickOutside from '@hooks/useDetectOutsideClick';
import { messageData, messageDataTwo } from '@mocks/data/chat.mock';
import { existingUser, existingUserFour } from '@mocks/data/user.mock';
import { fireEvent, render, screen } from '@root/test.utils';
import { timeAgo } from '@services/utils/timeago.utils';
import userEvent from '@testing-library/user-event';

jest.mock('@hooks/useDetectOutsideClick');

describe('MessageDisplay', () => {
  let props;
  beforeEach(() => {
    props = {
      chatMessages: [],
      profile: existingUser,
      updateMessageReaction: null
    };
    useOnClickOutside.mockReturnValue([false, null]);
  });

  it('should have empty message chat', async () => {
    render(<MessageDisplay {...props} />);
    const messagePage = await screen.findByTestId('message-page');
    expect(messagePage).toBeInTheDocument();
    expect(messagePage.childNodes.length).toEqual(0);
  });

  it('should have message chat', async () => {
    props.chatMessages = [messageData];
    render(<MessageDisplay {...props} />);
    const messageChat = await screen.findByTestId('message-chat');
    expect(messageChat).toBeInTheDocument();
    expect(messageChat.childNodes.length).toBeGreaterThan(0);
  });

  it('should display chat time ago', async () => {
    props.chatMessages = [messageData];
    render(<MessageDisplay {...props} />);
    const messageChatDate = await screen.findByTestId('message-chat-date');
    expect(messageChatDate).toBeInTheDocument();
    expect(messageChatDate.textContent).toEqual('15 May 2022');
  });

  it('should have only right side messages', async () => {
    props.chatMessages = [messageData];
    render(<MessageDisplay {...props} />);
    const timeFormat = timeAgo.timeFormat(messageData.createdAt);
    const rightSideElement = await screen.findAllByTestId('right-message');
    const chatMessageElement = await screen.findAllByText(/this is a message/i);
    const chatTimeElement = await screen.findAllByTestId('chat-time');
    expect(rightSideElement[0]).toBeInTheDocument();
    expect(chatMessageElement[0]).toBeInTheDocument();
    expect(chatTimeElement[0]).toBeInTheDocument();
    expect(chatMessageElement[0].textContent).toEqual('This is a message');
    expect(chatTimeElement[0].textContent).toEqual(timeFormat);
  });

  it('should have only left side messages', async () => {
    props.profile = existingUserFour;
    props.chatMessages = [messageDataTwo];
    render(<MessageDisplay {...props} />);
    const timeFormat = timeAgo.timeFormat(messageDataTwo.createdAt);
    const leftSideElement = await screen.findAllByTestId('left-message');
    const chatMessageElement = await screen.findAllByText(/this is a message/i);
    const chatTimeElement = await screen.findAllByTestId('chat-time');
    expect(leftSideElement[0]).toBeInTheDocument();
    expect(chatMessageElement[0]).toBeInTheDocument();
    expect(chatTimeElement[0]).toBeInTheDocument();
    expect(chatMessageElement[0].textContent).toEqual('This is a message');
    expect(chatTimeElement[0].textContent).toEqual(timeFormat);
  });

  it('should display reactions container', async () => {
    useOnClickOutside.mockReturnValue([true, null]);
    props.chatMessages = [messageData];
    render(<MessageDisplay {...props} />);
    const messageContent = await screen.findAllByTestId('message-content');
    fireEvent.mouseOver(messageContent[0]);
    const reactionsElement = await screen.findAllByTestId('reactions');
    expect(reactionsElement[0]).toBeInTheDocument();
  });

  it('should display reactions dialog', async () => {
    props.chatMessages = [messageData];
    render(<MessageDisplay {...props} />);
    const reactionImage = await screen.findAllByTestId('reaction-img');
    expect(reactionImage[0]).toBeInTheDocument();
    userEvent.click(reactionImage[0]);
    const dialogContainer = await screen.findAllByTestId('dialog-container');
    expect(dialogContainer[0]).toBeInTheDocument();
  });
});

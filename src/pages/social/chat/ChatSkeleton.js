import ChatListSkeleton from '@components/chat/list/ChatListSkeleton';
import Spinner from '@components/spinner/Spinner';

const ChatSkeleton = () => {
  return (
    <div className="private-chat-wrapper">
      <div className="private-chat-wrapper-content">
        <div className="private-chat-wrapper-content-side">
          <ChatListSkeleton />
        </div>
        <div className="private-chat-wrapper-content-conversation">
          <div className="message-loading">
            <Spinner />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatSkeleton;

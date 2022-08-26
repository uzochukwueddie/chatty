import Reactions from '@components/posts/reactions/Reactions';
import { timeAgo } from '@services/utils/timeago.utils';
import PropTypes from 'prop-types';
import doubleCheckmark from '@assets/images/double-checkmark.png';
import RightMessageBubble from '@components/chat/window/message-display/right-message-display/RightMessageBubble';
import { reactionsMap } from '@services/utils/static.data';

const RightMessageDisplay = ({
  chat,
  lastChatMessage,
  profile,
  toggleReaction,
  showReactionIcon,
  index,
  activeElementIndex,
  reactionRef,
  setToggleReaction,
  handleReactionClick,
  deleteMessage,
  showReactionIconOnHover,
  setActiveElementIndex,
  setSelectedReaction,
  setShowImageModal,
  setImageUrl,
  showImageModal
}) => {
  return (
    <div className="message right-message" data-testid="right-message">
      <div className="message-right-reactions-container">
        {toggleReaction && index === activeElementIndex && !chat?.deleteForEveryone && (
          <div ref={reactionRef}>
            <Reactions
              showLabel={false}
              handleClick={(event) => {
                const body = {
                  conversationId: chat?.conversationId,
                  messageId: chat?._id,
                  reaction: event,
                  type: 'add'
                };
                handleReactionClick(body);
                setToggleReaction(false);
              }}
            />
          </div>
        )}
      </div>
      <div className="message-right-content-container-wrapper">
        <div
          data-testid="message-content"
          className="message-content"
          onClick={() => {
            if (!chat.deleteForEveryone) {
              deleteMessage(chat, 'deleteForEveryone');
            }
          }}
          onMouseEnter={() => {
            if (!chat.deleteForEveryone) {
              showReactionIconOnHover(true, index);
              setActiveElementIndex(index);
            }
          }}
        >
          {chat?.deleteForEveryone && chat?.deleteForMe && (
            <div className="message-bubble right-message-bubble">
              <span className="message-deleted">message deleted</span>
            </div>
          )}
          {!chat?.deleteForEveryone && chat?.deleteForMe && chat?.senderUsername === profile?.username && (
            <div className="message-bubble right-message-bubble">
              <span className="message-deleted">message deleted</span>
            </div>
          )}
          {!chat?.deleteForEveryone && !chat?.deleteForMe && (
            <RightMessageBubble
              chat={chat}
              showImageModal={showImageModal}
              setImageUrl={setImageUrl}
              setShowImageModal={setShowImageModal}
            />
          )}
          {!chat?.deleteForEveryone && chat?.deleteForMe && chat.senderUsername === profile?.username && (
            <RightMessageBubble
              chat={chat}
              showImageModal={showImageModal}
              setImageUrl={setImageUrl}
              setShowImageModal={setShowImageModal}
            />
          )}
        </div>
        {showReactionIcon && index === activeElementIndex && !chat.deleteForEveryone && (
          <div className="message-content-emoji-right-container" onClick={() => setToggleReaction(true)}>
            &#9786;
          </div>
        )}
      </div>
      <div className="message-content-bottom">
        {chat?.reaction && chat?.reaction.length > 0 && !chat.deleteForEveryone && (
          <div className="message-reaction">
            {chat?.reaction.map((data, index) => (
              <img
                key={index}
                data-testid="reaction-img"
                src={reactionsMap[data?.type]}
                alt=""
                onClick={() => {
                  if (data?.senderName === profile?.username) {
                    const body = {
                      conversationId: chat?.conversationId,
                      messageId: chat?._id,
                      reaction: data?.type,
                      type: 'remove'
                    };
                    setSelectedReaction(body);
                  }
                }}
              />
            ))}
          </div>
        )}
        <div className="message-time">
          {chat?.senderUsername === profile?.username && !chat?.deleteForEveryone && (
            <>
              {lastChatMessage?.isRead ? (
                <img src={doubleCheckmark} alt="" className="message-read-icon" />
              ) : (
                <>{chat?.isRead && <img src={doubleCheckmark} alt="" className="message-read-icon" />}</>
              )}
            </>
          )}
          <span data-testid="chat-time">{timeAgo.timeFormat(chat?.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

RightMessageDisplay.propTypes = {
  chat: PropTypes.object,
  lastChatMessage: PropTypes.object,
  profile: PropTypes.object,
  reactionRef: PropTypes.any,
  toggleReaction: PropTypes.bool,
  showReactionIcon: PropTypes.bool,
  index: PropTypes.number,
  activeElementIndex: PropTypes.number,
  setToggleReaction: PropTypes.func,
  handleReactionClick: PropTypes.func,
  deleteMessage: PropTypes.func,
  showReactionIconOnHover: PropTypes.func,
  setActiveElementIndex: PropTypes.func,
  setSelectedReaction: PropTypes.func,
  setShowImageModal: PropTypes.func,
  showImageModal: PropTypes.bool,
  setImageUrl: PropTypes.func
};
export default RightMessageDisplay;

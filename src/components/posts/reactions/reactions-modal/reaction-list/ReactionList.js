import Avatar from '@components/avatar/Avatar';
import { reactionsMap } from '@services/utils/static.data';
import { Utils } from '@services/utils/utils.service';
import PropTypes from 'prop-types';

import '@components/posts/reactions/reactions-modal/reaction-list/ReactionList.scss';

const ReactionList = ({ postReactions }) => {
  return (
    <div className="modal-reactions-container" data-testid="modal-reactions-container">
      {postReactions.map((reaction) => (
        <div className="modal-reactions-container-list" key={Utils.generateString(10)} data-testid="reaction-list">
          <div className="img">
            <Avatar
              name={reaction?.username}
              bgColor={reaction?.avatarColor}
              textColor="#ffffff"
              size={50}
              avatarSrc={reaction?.profilePicture}
            />
            <img src={`${reactionsMap[reaction?.type]}`} alt="" className="reaction-icon" />
          </div>
          <span>{reaction?.username}</span>
        </div>
      ))}
    </div>
  );
};

ReactionList.propTypes = {
  postReactions: PropTypes.array
};

export default ReactionList;

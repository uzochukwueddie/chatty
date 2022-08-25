import ReactionWrapper from '@components/posts/modal-wrappers/reaction-wrapper/ReactionWrapper';
import ReactionList from '@components/posts/reactions/reactions-modal/reaction-list/ReactionList';
import useEffectOnce from '@hooks/useEffectOnce';
import { closeModal } from '@redux/reducers/modal/modal.reducer';
import { clearPost } from '@redux/reducers/post/post.reducer';
import { postService } from '@services/api/post/post.service';
import { reactionsColor, reactionsMap } from '@services/utils/static.data';
import { Utils } from '@services/utils/utils.service';
import { filter, orderBy, some } from 'lodash';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '@components/posts/reactions/reactions-modal/ReactionsModal.scss';

const ReactionsModal = () => {
  const { _id, reactions } = useSelector((state) => state.post);
  const [activeViewAllTab, setActiveViewAllTab] = useState(true);
  const [formattedReactions, setFormattedReactions] = useState([]);
  const [reactionType, setReactionType] = useState('');
  const [reactionColor, setReactionColor] = useState('');
  const [postReactions, setPostReactions] = useState([]);
  const [reactionsOfPost, setReactionsOfPost] = useState([]);
  const dispatch = useDispatch();

  const getPostReactions = async () => {
    try {
      const response = await postService.getPostReactions(_id);
      const orderedPosts = orderBy(response.data?.reactions, ['createdAt'], ['desc']);
      setPostReactions(orderedPosts);
      setReactionsOfPost(orderedPosts);
    } catch (error) {
      Utils.dispatchNotification(error.response.data.message, 'error', dispatch);
    }
  };

  const closeReactionsModal = () => {
    dispatch(closeModal());
    dispatch(clearPost());
  };

  const viewAll = () => {
    setActiveViewAllTab(true);
    setReactionType('');
    setPostReactions(reactionsOfPost);
  };

  const reactionList = (type) => {
    setActiveViewAllTab(false);
    setReactionType(type);
    const exist = some(reactionsOfPost, (reaction) => reaction.type === type);
    const filteredReactions = exist ? filter(reactionsOfPost, (reaction) => reaction.type === type) : [];
    setPostReactions(filteredReactions);
    setReactionColor(reactionsColor[type]);
  };

  useEffectOnce(() => {
    getPostReactions();
    setFormattedReactions(Utils.formattedReactions(reactions));
  });

  return (
    <>
      <ReactionWrapper closeModal={closeReactionsModal}>
        <div className="modal-reactions-header-tabs">
          <ul className="modal-reactions-header-tabs-list">
            <li className={`${activeViewAllTab ? 'activeViewAllTab' : 'all'}`} onClick={viewAll}>
              All
            </li>
            {formattedReactions.map((reaction) => (
              <li
                key={Utils.generateString(10)}
                className={`${reaction.type === reactionType ? 'activeTab' : ''}`}
                style={{ color: `${reaction.type === reactionType ? reactionColor : ''}` }}
                onClick={() => reactionList(reaction?.type)}
              >
                <img src={`${reactionsMap[reaction?.type]}`} atl="" />
                <span>{Utils.shortenLargeNumbers(reaction?.value)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="modal-reactions-list">
          <ReactionList postReactions={postReactions} />
        </div>
      </ReactionWrapper>
    </>
  );
};
export default ReactionsModal;

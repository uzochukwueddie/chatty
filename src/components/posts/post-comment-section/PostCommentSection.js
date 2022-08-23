import CommentArea from '@components/posts/comment-area/CommentArea';
import ReactionsAndCommentsDisplay from '@components/posts/reactions/reactions-and-comments-display/ReactionsAndCommentsDisplay';
import PropTypes from 'prop-types';

const PostCommentSection = ({ post }) => {
  return (
    <div data-testid="comment-section">
      <ReactionsAndCommentsDisplay post={post} />
      <CommentArea post={post} />
    </div>
  );
};

PostCommentSection.propTypes = {
  post: PropTypes.object
};

export default PostCommentSection;

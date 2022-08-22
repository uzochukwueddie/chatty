import '@components/posts/modal-wrappers/post-wrapper/PostWrapper.scss';
import PropTypes from 'prop-types';

const PostWrapper = ({ children }) => {
  return (
    <div className="modal-wrapper" data-testid="post-modal">
      {children[1]}
      {children[2]}
      {children[3]}
      <div className="modal-bg"></div>
    </div>
  );
};

PostWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default PostWrapper;

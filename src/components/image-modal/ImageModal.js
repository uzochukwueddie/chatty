import PropTypes from 'prop-types';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';

import '@components/image-modal/ImageModal.scss';

const ImageModal = ({ image, onCancel, onClickLeft, onClickRight, showArrow, lastItemRight, lastItemLeft }) => {
  return (
    <div className="image-modal-container" data-testid="image-modal">
      <div className="image-modal-icon" onClick={onCancel}>
        <FaTimes />
      </div>
      {showArrow && (
        <div
          className={'image-modal-icon-left'}
          onClick={onClickLeft}
          style={{ pointerEvents: `${lastItemLeft ? 'none' : 'all'}`, color: `${lastItemLeft ? '#bdbdbd' : ''}` }}
        >
          <FaArrowLeft />
        </div>
      )}
      <div className="image-modal-overlay">
        <div className="image-modal-box">
          <img className="modal-image" alt="" src={`${image}`} />
        </div>
      </div>
      {showArrow && (
        <div
          className={'image-modal-icon-right'}
          onClick={onClickRight}
          style={{ pointerEvents: `${lastItemRight ? 'none' : 'all'}`, color: `${lastItemRight ? '#bdbdbd' : ''}` }}
        >
          <FaArrowRight />
        </div>
      )}
    </div>
  );
};

ImageModal.propTypes = {
  image: PropTypes.string,
  onCancel: PropTypes.func,
  onClickRight: PropTypes.func,
  onClickLeft: PropTypes.func,
  showArrow: PropTypes.bool,
  lastItemRight: PropTypes.bool,
  lastItemLeft: PropTypes.bool
};

export default ImageModal;

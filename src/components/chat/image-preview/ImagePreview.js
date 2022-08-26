import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import '@components/chat/image-preview/ImagePreview.scss';

const ImagePreview = ({ image, onRemoveImage }) => {
  return (
    <div className="image-preview-container" data-testid="image-preview">
      <div className="image-preview">
        <img className="img" src={image} alt="" />
        <FaTimes className="icon" onClick={onRemoveImage} />
      </div>
    </div>
  );
};

ImagePreview.propTypes = {
  image: PropTypes.string,
  onRemoveImage: PropTypes.func
};
export default ImagePreview;

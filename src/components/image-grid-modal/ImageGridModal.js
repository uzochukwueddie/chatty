import PropTypes from 'prop-types';
import '@components/image-grid-modal/ImageGridModal.scss';
import ReactionWrapper from '@components/posts/modal-wrappers/reaction-wrapper/ReactionWrapper';
import { Utils } from '@services/utils/utils.service';

const ImageGridModal = ({ images, closeModal, selectedImage }) => {
  return (
    <ReactionWrapper closeModal={closeModal}>
      <div className="modal-image-header">
        <h2>Select Photo</h2>
      </div>
      <div className="modal-image-container">
        {images.map((data, index) => (
          <img
            key={index}
            className="grid-image"
            alt=""
            src={`${Utils.getImage(data?.imgId, data?.imgVersion)}`}
            onClick={() => {
              selectedImage(Utils.getImage(data?.imgId, data?.imgVersion));
              closeModal();
            }}
          />
        ))}
      </div>
    </ReactionWrapper>
  );
};

ImageGridModal.propTypes = {
  images: PropTypes.array,
  closeModal: PropTypes.func,
  selectedImage: PropTypes.func
};

export default ImageGridModal;

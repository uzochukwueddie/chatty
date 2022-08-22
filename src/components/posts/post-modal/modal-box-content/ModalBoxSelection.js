import photo from '@assets/images/photo.png';
import gif from '@assets/images/gif.png';
import feeling from '@assets/images/feeling.png';
import Input from '@components/input/Input';
import useDetectOutsideClick from '@hooks/useDetectOutsideClick';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Feelings from '@components/feelings/Feelings';
import { ImageUtils } from '@services/utils/image-utils.service';
import PropTypes from 'prop-types';
import { toggleGifModal } from '@redux/reducers/modal/modal.reducer';

const ModalBoxSelection = ({ setSelectedPostImage }) => {
  const { feelingIsOpen, gifModalIsOpen } = useSelector((state) => state.modal);
  const { post } = useSelector((state) => state.post);
  const feelingsRef = useRef(null);
  const fileInputRef = useRef();
  const [toggleFeelings, setToggleFeelings] = useDetectOutsideClick(feelingsRef, feelingIsOpen);
  const dispatch = useDispatch();

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    ImageUtils.addFileToRedux(event, post, setSelectedPostImage, dispatch);
  };

  return (
    <>
      {toggleFeelings && (
        <div ref={feelingsRef}>
          <Feelings />
        </div>
      )}
      <div className="modal-box-selection" data-testid="modal-box-selection">
        <ul className="post-form-list" data-testid="list-item">
          <li className="post-form-list-item image-select" onClick={fileInputClicked}>
            <Input
              name="image"
              ref={fileInputRef}
              type="file"
              className="file-input"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.value = null;
                }
              }}
              handleChange={handleFileChange}
            />
            <img src={photo} alt="" /> Photo
          </li>
          <li className="post-form-list-item" onClick={() => dispatch(toggleGifModal(!gifModalIsOpen))}>
            <img src={gif} alt="" /> Gif
          </li>
          <li className="post-form-list-item" onClick={() => setToggleFeelings(!toggleFeelings)}>
            <img src={feeling} alt="" /> Feeling
          </li>
        </ul>
      </div>
    </>
  );
};
ModalBoxSelection.propTypes = {
  setSelectedPostImage: PropTypes.func
};
export default ModalBoxSelection;

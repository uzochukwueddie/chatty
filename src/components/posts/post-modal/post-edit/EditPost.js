import PostWrapper from '@components/posts/modal-wrappers/post-wrapper/PostWrapper';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '@components/posts/post-modal/post-edit/EditPost.scss';
import ModalBoxContent from '@components/posts/post-modal/modal-box-content/ModalBoxContent';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';
import { bgColors, feelingsList } from '@services/utils/static.data';
import ModalBoxSelection from '@components/posts/post-modal/modal-box-content/ModalBoxSelection';
import Button from '@components/button/Button';
import { PostUtils } from '@services/utils/post-utils.service';
import { addPostFeeling, closeModal, toggleGifModal } from '@redux/reducers/modal/modal.reducer';
import Giphy from '@components/giphy/Giphy';
import { ImageUtils } from '@services/utils/image-utils.service';
import Spinner from '@components/spinner/Spinner';
import { find } from 'lodash';
import { Utils } from '@services/utils/utils.service';

const EditPost = () => {
  const { gifModalIsOpen, feeling } = useSelector((state) => state.modal);
  const { post } = useSelector((state) => state);
  const { profile } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [postImage, setPostImage] = useState('');
  const [allowedNumberOfCharacters] = useState('100/100');
  const [textAreaBackground, setTextAreaBackground] = useState('#ffffff');
  const [postData, setPostData] = useState({
    post: '',
    bgColor: textAreaBackground,
    privacy: '',
    feelings: '',
    gifUrl: '',
    profilePicture: '',
    image: '',
    imgId: '',
    imgVersion: ''
  });
  const [disable, setDisable] = useState(true);
  const [apiResponse, setApiResponse] = useState('');
  const [selectedPostImage, setSelectedPostImage] = useState(null);
  const counterRef = useRef(null);
  const inputRef = useRef(null);
  const imageInputRef = useRef(null);
  const dispatch = useDispatch();

  const maxNumberOfCharacters = 100;

  const selectBackground = (bgColor) => {
    PostUtils.selectBackground(bgColor, postData, setTextAreaBackground, setPostData);
  };

  const postInputEditable = (event, textContent) => {
    const currentTextLength = event.target.textContent.length;
    const counter = maxNumberOfCharacters - currentTextLength;
    counterRef.current.textContent = `${counter}/100`;
    setDisable(currentTextLength <= 0 && !postImage);
    PostUtils.postInputEditable(textContent, postData, setPostData);
  };

  const closePostModal = () => {
    PostUtils.closePostModal(dispatch);
  };

  const onKeyDown = (event) => {
    const currentTextLength = event.target.textContent.length;
    if (currentTextLength === maxNumberOfCharacters && event.keyCode !== 8) {
      event.preventDefault();
    }
  };

  const clearImage = () => {
    PostUtils.clearImage(postData, post?.post, inputRef, dispatch, setSelectedPostImage, setPostImage, setPostData);
  };

  const getFeeling = useCallback(
    (name) => {
      const feeling = find(feelingsList, (data) => data.name === name);
      dispatch(addPostFeeling({ feeling }));
    },
    [dispatch]
  );

  const postInputData = useCallback(() => {
    setTimeout(() => {
      if (imageInputRef?.current) {
        postData.post = post?.post;
        imageInputRef.current.textContent = post?.post;
        setPostData(postData);
      }
    });
  }, [post, postData]);

  const editableFields = useCallback(() => {
    if (post?.feelings) {
      getFeeling(post?.feelings);
    }

    if (post?.bgColor) {
      postData.bgColor = post?.bgColor;
      setPostData(postData);
      setTextAreaBackground(post?.bgColor);
      setTimeout(() => {
        if (inputRef?.current) {
          postData.post = post?.post;
          inputRef.current.textContent = post?.post;
          setPostData(postData);
        }
      });
    }

    if (post?.gifUrl && !post?.imgId) {
      postData.gifUrl = post?.gifUrl;
      setPostImage(post?.gifUrl);
      postInputData();
    }

    if (post?.imgId && !post?.gifUrl) {
      postData.imgId = post?.imgId;
      postData.imgVersion = post?.imgVersion;
      const imageUrl = Utils.getImage(post?.imgId, post?.imgVersion);
      setPostImage(imageUrl);
      postInputData();
    }
  }, [post, postData, getFeeling, postInputData]);

  const updatePost = async () => {
    setLoading(!loading);
    setDisable(!disable);
    try {
      if (Object.keys(feeling).length) {
        postData.feelings = feeling?.name;
      }
      if (postData.gifUrl || (postData.imgId && postData.imgVersion)) {
        postData.bgColor = '#ffffff';
      }
      postData.privacy = post?.privacy || 'Public';
      postData.profilePicture = profile?.profilePicture;
      if (selectedPostImage) {
        const result = await ImageUtils.readAsBase64(selectedPostImage);
        await PostUtils.sendUpdatePostWithImageRequest(
          result,
          post?._id,
          postData,
          setApiResponse,
          setLoading,
          dispatch
        );
      } else {
        await PostUtils.sendUpdatePostRequest(post?._id, postData, setApiResponse, setLoading, dispatch);
      }
    } catch (error) {
      PostUtils.dispatchNotification(error.response.data.message, 'error', setApiResponse, setLoading, dispatch);
    }
  };

  useEffect(() => {
    PostUtils.positionCursor('editable');
  }, [post]);

  useEffect(() => {
    setTimeout(() => {
      if (imageInputRef?.current && imageInputRef?.current.textContent.length) {
        counterRef.current.textContent = `${maxNumberOfCharacters - imageInputRef?.current.textContent.length}/100`;
      } else if (inputRef?.current && inputRef?.current.textContent.length) {
        counterRef.current.textContent = `${maxNumberOfCharacters - inputRef?.current.textContent.length}/100`;
      }
    });
  }, []);

  useEffect(() => {
    if (!loading && apiResponse === 'success') {
      dispatch(closeModal());
    }
    setDisable(post?.post.length <= 0 && !postImage);
  }, [loading, dispatch, apiResponse, post, postImage]);

  useEffect(() => {
    if (post?.gifUrl) {
      postData.image = '';
      setSelectedPostImage(null);
      setPostImage(post?.gifUrl);
      PostUtils.postInputData(imageInputRef, postData, post?.post, setPostData);
    } else if (post?.image) {
      setPostImage(post?.image);
      PostUtils.postInputData(imageInputRef, postData, post?.post, setPostData);
    }
    editableFields();
  }, [editableFields, post, postData]);

  return (
    <>
      <PostWrapper>
        <div></div>
        {!gifModalIsOpen && (
          <div
            className="modal-box"
            style={{
              height: selectedPostImage || post?.gifUrl || post?.imgId ? '700px' : 'auto'
            }}
          >
            {loading && (
              <div className="modal-box-loading" data-testid="modal-box-loading">
                <span>Updating post...</span>
                <Spinner />
              </div>
            )}
            <div className="modal-box-header">
              <h2>Edit Post</h2>
              <button className="modal-box-header-cancel" onClick={() => closePostModal()}>
                X
              </button>
            </div>
            <hr />
            <ModalBoxContent />

            {!postImage && (
              <>
                <div
                  className="modal-box-form"
                  data-testid="modal-box-form"
                  style={{ background: `${textAreaBackground}` }}
                >
                  <div className="main" style={{ margin: textAreaBackground !== '#ffffff' ? '0 auto' : '' }}>
                    <div className="flex-row">
                      <div
                        data-testid="editable"
                        id="editable"
                        name="post"
                        ref={(el) => {
                          inputRef.current = el;
                          inputRef?.current?.focus();
                        }}
                        className={`editable flex-item ${textAreaBackground !== '#ffffff' ? 'textInputColor' : ''} ${
                          postData.post.length === 0 && textAreaBackground !== '#ffffff' ? 'defaultInputTextColor' : ''
                        }`}
                        contentEditable={true}
                        onInput={(e) => postInputEditable(e, e.currentTarget.textContent)}
                        onKeyDown={onKeyDown}
                        data-placeholder="What's on your mind?..."
                      ></div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {postImage && (
              <>
                <div className="modal-box-image-form">
                  <div
                    data-testid="post-editable"
                    name="post"
                    id="editable"
                    ref={(el) => {
                      imageInputRef.current = el;
                      imageInputRef?.current?.focus();
                    }}
                    className="post-input flex-item"
                    contentEditable={true}
                    onInput={(e) => postInputEditable(e, e.currentTarget.textContent)}
                    onKeyDown={onKeyDown}
                    data-placeholder="What's on your mind?..."
                  ></div>
                  <div className="image-display">
                    <div className="image-delete-btn" data-testid="image-delete-btn" onClick={() => clearImage()}>
                      <FaTimes />
                    </div>
                    <img data-testid="post-image" className="post-image" src={`${postImage}`} alt="" />
                  </div>
                </div>
              </>
            )}

            <div className="modal-box-bg-colors">
              <ul>
                {bgColors.map((color, index) => (
                  <li
                    data-testid="bg-colors"
                    key={index}
                    className={`${color === '#ffffff' ? 'whiteColorBorder' : ''}`}
                    style={{ backgroundColor: `${color}` }}
                    onClick={() => {
                      PostUtils.positionCursor('editable');
                      selectBackground(color);
                    }}
                  ></li>
                ))}
              </ul>
            </div>
            <span className="char_count" data-testid="allowed-number" ref={counterRef}>
              {allowedNumberOfCharacters}
            </span>

            <ModalBoxSelection setSelectedPostImage={setSelectedPostImage} />

            <div className="modal-box-button" data-testid="edit-button">
              <Button label="Update" className="post-button" disabled={disable} handleClick={updatePost} />
            </div>
          </div>
        )}
        {gifModalIsOpen && (
          <div className="modal-giphy" data-testid="modal-giphy">
            <div className="modal-giphy-header">
              <Button
                label={<FaArrowLeft />}
                className="back-button"
                disabled={false}
                handleClick={() => dispatch(toggleGifModal(!gifModalIsOpen))}
              />
              <h2>Choose a GIF</h2>
            </div>
            <hr />
            <Giphy />
          </div>
        )}
      </PostWrapper>
    </>
  );
};

export default EditPost;

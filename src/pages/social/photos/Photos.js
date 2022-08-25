import GalleryImage from '@components/gallery-image/GalleryImage';
import useEffectOnce from '@hooks/useEffectOnce';
import { followerService } from '@services/api/followers/follower.service';
import { postService } from '@services/api/post/post.service';
import { PostUtils } from '@services/utils/post-utils.service';
import { Utils } from '@services/utils/utils.service';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '@pages/social/photos/Photos.scss';
import ImageModal from '@components/image-modal/ImageModal';

const Photos = () => {
  const { profile } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rightImageIndex, setRightImageIndex] = useState();
  const [leftImageIndex, setLeftImageIndex] = useState();
  const [lastItemRight, setLastItemRight] = useState(false);
  const [lastItemLeft, setLastItemLeft] = useState(false);
  const dispatch = useDispatch();

  const getPostsWithImages = async () => {
    try {
      const response = await postService.getPostsWithImages(1);
      setPosts(response.data.posts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Utils.dispatchNotification(error.response.data.message, 'error', dispatch);
    }
  };

  const getUserFollowing = async () => {
    try {
      const response = await followerService.getUserFollowing();
      setFollowing(response.data.following);
    } catch (error) {
      Utils.dispatchNotification(error.response.data.message, 'error', dispatch);
    }
  };

  const postImageUrl = (post) => {
    const imgUrl = Utils.getImage(post?.imgId, post?.imgVersion);
    return post?.gifUrl ? post?.gifUrl : imgUrl;
  };

  const emptyPost = (post) => {
    return (
      Utils.checkIfUserIsBlocked(profile?.blockedBy, post?.userId) || PostUtils.checkPrivacy(post, profile, following)
    );
  };

  const displayImage = (post) => {
    const imgUrl = post?.gifUrl ? post?.gifUrl : Utils.getImage(post?.imgId, post?.imgVersion);
    setImageUrl(imgUrl);
  };

  const onClickRight = () => {
    setLastItemLeft(false);
    setRightImageIndex((index) => index + 1);
    const lastImage = posts[posts.length - 1];
    const post = posts[rightImageIndex];
    displayImage(post);
    setLeftImageIndex(rightImageIndex);
    if (posts[rightImageIndex] === lastImage) {
      setLastItemRight(true);
    }
  };

  const onClickLeft = () => {
    setLastItemRight(false);
    setLeftImageIndex((index) => index - 1);
    const firstImage = posts[0];
    const post = posts[leftImageIndex - 1];
    displayImage(post);
    setRightImageIndex(leftImageIndex);
    if (firstImage === post) {
      setLastItemLeft(true);
    }
  };

  useEffectOnce(() => {
    getPostsWithImages();
    getUserFollowing();
  });

  return (
    <>
      <div className="photos-container">
        {showImageModal && (
          <ImageModal
            image={`${imageUrl}`}
            showArrow={true}
            onClickRight={() => onClickRight()}
            onClickLeft={() => onClickLeft()}
            lastItemLeft={lastItemLeft}
            lastItemRight={lastItemRight}
            onCancel={() => {
              setRightImageIndex(0);
              setLeftImageIndex(0);
              setLastItemRight(false);
              setLastItemLeft(false);
              setShowImageModal(!showImageModal);
              setImageUrl('');
            }}
          />
        )}
        <div className="photos">Photos</div>
        {posts.length > 0 && (
          <div className="gallery-images">
            {posts.map((post, index) => (
              <div
                key={Utils.generateString(10)}
                className={`${!emptyPost(post) ? 'empty-post-div' : ''}`}
                data-testid="gallery-images"
              >
                {(!Utils.checkIfUserIsBlocked(profile?.blockedBy, post?.userId) || post?.userId === profile?._id) && (
                  <>
                    {PostUtils.checkPrivacy(post, profile, following) && (
                      <>
                        <GalleryImage
                          post={post}
                          showCaption={true}
                          showDelete={false}
                          imgSrc={`${postImageUrl(post)}`}
                          onClick={() => {
                            setRightImageIndex(index + 1);
                            setLeftImageIndex(index);
                            setLastItemLeft(index === 0);
                            setLastItemRight(index + 1 === posts.length);
                            setImageUrl(postImageUrl(post));
                            setShowImageModal(!showImageModal);
                          }}
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {loading && !posts.length && <div className="card-element" style={{ height: '350px' }}></div>}

        {!loading && !posts.length && (
          <div className="empty-page" data-testid="empty-page">
            There are no photos to display
          </div>
        )}
      </div>
    </>
  );
};

export default Photos;

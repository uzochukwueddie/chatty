import BackgroundHeaderSkeleton from '@components/background-header/BackgroundHeaderSkeleton';
import PostSkeleton from '@components/posts/post/PostSkeleton';
import PostFormSkeleton from '@components/posts/post-form/PostFormSkeleton';
import { tabItems } from '@services/utils/static.data';

const ProfileSkeleton = () => {
  return (
    <div className="profile-wrapper">
      <div className="profile-wrapper-container">
        <div className="profile-header">
          <BackgroundHeaderSkeleton tabItems={tabItems(true, true)} />
        </div>
        <div className="profile-content">
          <div className="timeline-wrapper-container-main">
            <div style={{ marginBottom: '10px' }}>
              <PostFormSkeleton />
            </div>
            <>
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index}>
                  <PostSkeleton />
                </div>
              ))}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileSkeleton;

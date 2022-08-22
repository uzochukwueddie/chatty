import Skeleton from 'react-loading-skeleton';
import '@components/posts/post/Post.scss';

const PostSkeleton = () => {
  return (
    <div className="post-body" data-testid="posts-skeleton">
      <div className="user-post-data">
        <div className="user-post-data-wrap">
          <Skeleton baseColor="#EFF1F6" circle height="100%" containerClassName="avatar-skeleton" />
          <div className="user-post-info">
            <div className="inline-title-display">
              <h5>
                <Skeleton baseColor="#EFF1F6" width={120} height={20} style={{ marginBottom: '5px' }} />
              </h5>
            </div>

            <p className="time-text-display">
              <Skeleton baseColor="#EFF1F6" width={70} />
            </p>
          </div>
          <div className="user-post" style={{ marginTop: '1rem', borderBottom: '' }}>
            <div className="user-post-with-bg" style={{ backgroundColor: '#EFF1F6' }}>
              <p className="time-text-display">
                <Skeleton baseColor="#EFF1F6" width={70} /> &middot; <Skeleton baseColor="#EFF1F6" width={70} />
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0px' }}>
              <div>
                <Skeleton baseColor="#EFF1F6" width={120} height={25} />
              </div>
              <div>
                <Skeleton baseColor="#EFF1F6" width={120} height={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostSkeleton;

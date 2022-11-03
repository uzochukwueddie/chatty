import Skeleton from 'react-loading-skeleton';

const VideoSkeleton = () => {
  return (
    <>
      <div className="videos-container">
        <div className="videos">Videos</div>
        <div className="gallery-videos">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
            <div key={index}>
              <Skeleton baseColor="#EFF1F6" height={200} width={350} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default VideoSkeleton;

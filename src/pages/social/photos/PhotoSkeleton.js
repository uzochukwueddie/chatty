import Skeleton from 'react-loading-skeleton';

const PhotoSkeleton = () => {
  return (
    <>
      <div className="photos-container">
        <div className="photos">Photos</div>
        <div className="gallery-images">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((post, index) => (
            <div key={index}>
              <Skeleton baseColor="#EFF1F6" height={352} width={352} style={{ borderRadius: '16px' }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default PhotoSkeleton;

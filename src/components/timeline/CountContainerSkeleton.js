import Skeleton from 'react-loading-skeleton';

const CountContainerSkeleton = () => {
  return (
    <div className="count-container" data-testid="count-container-skeleton">
      <div className="followers-count">
        <span className="count" data-testid="info">
          <Skeleton baseColor="#EFF1F6" width={20} />
        </span>
        <p>
          <Skeleton baseColor="#EFF1F6" width={100} />
        </p>
      </div>
      <div className="vertical-line"></div>
      <div className="following-count">
        <span className="count" data-testid="info">
          <Skeleton baseColor="#EFF1F6" width={20} />
        </span>
        <p>
          <Skeleton baseColor="#EFF1F6" width={100} />
        </p>
      </div>
    </div>
  );
};
export default CountContainerSkeleton;

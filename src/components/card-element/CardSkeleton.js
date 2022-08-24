import Skeleton from 'react-loading-skeleton';

const CardSkeleton = () => {
  return (
    <div className="card-element" data-testid="card-skeleton">
      {[1, 2, 3].map((user, index) => (
        <div className="card-element-item" key={index}>
          <div className="card-element-header">
            <div className="card-element-header-bg"></div>
            <Skeleton baseColor="#EFF1F6" circle height={120} width={120} containerClassName="avatar-container" />
            <div className="card-element-header-text">
              <span className="card-element-header-name">
                <Skeleton baseColor="#EFF1F6" width={100} />
              </span>
            </div>
          </div>
          <div className="card-element-stats" style={{ margin: '0px 5px' }}>
            <div className="card-element-stats-group">
              <p className="card-element-stats-group-title"></p>
              <h5 className="card-element-stats-group-info">
                <Skeleton baseColor="#EFF1F6" width={65} height={20} />
              </h5>
            </div>
            <div className="card-element-stats-group">
              <p className="card-element-stats-group-title"></p>
              <h5 className="card-element-stats-group-info">
                <Skeleton baseColor="#EFF1F6" width={65} height={20} />
              </h5>
            </div>
            <div className="card-element-stats-group">
              <p className="card-element-stats-group-title"></p>
              <h5 className="card-element-stats-group-info">
                <Skeleton baseColor="#EFF1F6" width={65} height={20} />
              </h5>
            </div>
          </div>

          <div className="card-element-buttons" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Skeleton baseColor="#EFF1F6" width={70} height={40} />
            <Skeleton baseColor="#EFF1F6" width={70} height={40} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default CardSkeleton;

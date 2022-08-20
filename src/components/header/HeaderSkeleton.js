import Skeleton from 'react-loading-skeleton';

const HeaderSkeleton = () => {
  return (
    <div className="header-nav-wrapper" data-testid="header-skeleton">
      <div className="header-navbar">
        <div className="header-image">
          <Skeleton baseColor="#EFF1F6" circle height={50} width={50} containerClassName="img-fluid" />
          <Skeleton
            baseColor="#EFF1F6"
            width={80}
            height={20}
            style={{ marginLeft: '5px' }}
            containerClassName="app-name-skeleton"
          />
        </div>
        <ul className="header-nav">
          <li className="header-nav-item active-item">
            <Skeleton baseColor="#EFF1F6" circle height={20} width={20} style={{ marginRight: '20px' }} />
            &nbsp;
          </li>
          <li className="header-nav-item active-item">
            <Skeleton baseColor="#EFF1F6" circle height={20} width={20} style={{ marginRight: '10px' }} />
            &nbsp;
          </li>
          <li className="header-nav-item">
            <span className="header-list-name profile-image">
              <Skeleton baseColor="#EFF1F6" circle height={40} width={40} containerClassName="avatar-skeleton" />
            </span>
            <span className="header-list-name profile-name">
              <Skeleton baseColor="#EFF1F6" width={80} height={20} style={{ marginLeft: '5px' }} />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default HeaderSkeleton;

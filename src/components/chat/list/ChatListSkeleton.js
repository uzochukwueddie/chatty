import Skeleton from 'react-loading-skeleton';

const ChatListSkeleton = () => {
  return (
    <div>
      <div className="conversation-container">
        <div className="conversation-container-header">
          <div className="header-img">
            <Skeleton baseColor="#EFF1F6" circle height={40} width={40} />
          </div>
          <div className="title-text">
            <Skeleton baseColor="#EFF1F6" height={20} width={150} />
          </div>
        </div>

        <div className="conversation-container-search">
          <Skeleton baseColor="#EFF1F6" height={30} width="100%" />
        </div>

        <div className="conversation-container-body">
          <div className="conversation">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((data, index) => (
              <div className="conversation-item" key={index}>
                <div className="avatar">
                  <Skeleton baseColor="#EFF1F6" circle height={45} width={45} />
                </div>
                <div className="title-text" style={{ marginBottom: '7px' }}>
                  <Skeleton baseColor="#EFF1F6" height={20} width={120} />
                </div>
                <div className="conversation-message" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>
                    <Skeleton baseColor="#EFF1F6" height={20} width={70} />
                  </span>
                  <Skeleton baseColor="#EFF1F6" height={20} width={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatListSkeleton;

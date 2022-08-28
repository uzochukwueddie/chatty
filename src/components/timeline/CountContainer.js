import PropTypes from 'prop-types';
import { Utils } from '@services/utils/utils.service';
import CountContainerSkeleton from '@components/timeline/CountContainerSkeleton';
import '@components/timeline/Timeline.scss';

const CountContainer = ({ followingCount, followersCount, loading }) => {
  return (
    <>
      {loading ? (
        <CountContainerSkeleton />
      ) : (
        <div className="count-container" data-testid="count-container">
          <div className="followers-count">
            <span className="count" data-testid="info">
              {Utils.shortenLargeNumbers(followersCount)}
            </span>
            <p>{`${followersCount > 1 ? 'Followers' : 'Follower'}`}</p>
          </div>
          <div className="vertical-line"></div>
          <div className="following-count">
            <span className="count" data-testid="info">
              {Utils.shortenLargeNumbers(followingCount)}
            </span>
            <p>Following</p>
          </div>
        </div>
      )}
    </>
  );
};

CountContainer.propTypes = {
  followingCount: PropTypes.number,
  followersCount: PropTypes.number,
  loading: PropTypes.bool
};

export default CountContainer;

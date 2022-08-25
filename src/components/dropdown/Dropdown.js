import Avatar from '@components/avatar/Avatar';
import Button from '@components/button/Button';
import PropTypes from 'prop-types';
import { FaCircle, FaRegCircle, FaTrashAlt, FaUserAlt } from 'react-icons/fa';

import '@components/dropdown/Dropdown.scss';
import { Utils } from '@services/utils/utils.service';

const Dropdown = ({
  data,
  notificationCount,
  title,
  style,
  height,
  onMarkAsRead,
  onDeleteNotification,
  onLogout,
  onNavigate
}) => {
  return (
    <div className="social-dropdown" style={style} data-testid="dropdown">
      <div className="social-card">
        <div className="social-card-body">
          <div className="social-bg-primary">
            <h5>
              {title}
              {title === 'Notifications' && notificationCount > 0 && (
                <small className="social-count">{notificationCount}</small>
              )}
            </h5>
          </div>

          <div className="social-card-body-info">
            <div
              data-testid="info-container"
              className="social-card-body-info-container"
              style={{ maxHeight: `${height}px` }}
            >
              {data.map((item) => (
                <div className="social-sub-card" key={Utils.generateString(10)}>
                  <div className="content-avatar">
                    {title === 'Notifications' ? (
                      <Avatar
                        name={item?.username}
                        bgColor={item?.avatarColor}
                        textColor="#ffffff"
                        size={40}
                        avatarSrc={item?.profilePicture}
                      />
                    ) : (
                      <FaUserAlt className="userIcon" />
                    )}
                  </div>
                  <div
                    className="content-body"
                    onClick={() => {
                      if (title === 'Notifications') {
                        onMarkAsRead(item);
                      } else {
                        onNavigate();
                      }
                    }}
                  >
                    <h6 className="title">{item?.topText}</h6>
                    <p className="subtext">{item?.subText}</p>
                  </div>
                  {title === 'Notifications' && (
                    <div className="content-icons">
                      <FaTrashAlt className="trash" onClick={() => onDeleteNotification(item?._id)} />
                      {item?.read ? <FaRegCircle className="circle" /> : <FaCircle className="circle" />}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {title === 'Settings' && (
              <div className="social-sub-button">
                <Button label="Sign out" className="button signOut" handleClick={onLogout} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  data: PropTypes.array,
  notificationCount: PropTypes.number,
  title: PropTypes.string,
  style: PropTypes.object,
  height: PropTypes.number,
  onMarkAsRead: PropTypes.func,
  onDeleteNotification: PropTypes.func,
  onLogout: PropTypes.func,
  onNavigate: PropTypes.func
};

export default Dropdown;

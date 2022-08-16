import { useState } from 'react';
import { Login, Register } from '../index';
import './AuthTabs.scss';
import backgroundImage from '../../../assets/images/background.jpg';

const AuthTabs = () => {
  const [type, setType] = useState('Sign In');

  return (
    <>
      <div className="container-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="environment">DEV</div>
        <div className="container-wrapper-auth">
          <div className="tabs">
            <div className="tabs-auth">
              <ul className="tab-group">
                <li className={`tab ${type === 'Sign In' ? 'active' : ''}`} onClick={() => setType('Sign In')}>
                  <button className="login">Sign In</button>
                </li>
                <li className={`tab ${type === 'Sign Up' ? 'active' : ''}`} onClick={() => setType('Sign Up')}>
                  <button className="signup">Sign Up</button>
                </li>
              </ul>
              {type === 'Sign In' && (
                <div className="tab-item">
                  <Login />
                </div>
              )}
              {type === 'Sign Up' && (
                <div className="tab-item">
                  <Register />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthTabs;

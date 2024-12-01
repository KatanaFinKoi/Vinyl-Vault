import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../utils/auth';
import VinylLogo from '../assets/VinylLogo.png';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck]);

  // Function to handle the logo click for conditional routing
  const handleLogoClick = () => {
    if (loginCheck) {
      navigate('/home'); // Go to home page if logged in
    } else {
      navigate('/'); // Go to login page if logged out
    }
  };

  return (
    <div className='nav'>
     <div className="nav-title">
        {/* Vinyl Logo as the home button */}
        <img
          src={VinylLogo}
          className="VinylLogo"
          alt="Vinyl Logo"
          style={{ cursor: 'pointer' }}
          onClick={handleLogoClick}
        />
        {/* Navigation buttons next to the logo */}
        {loginCheck && (
          <div className="nav-buttons" style={{ display: 'inline-block', marginLeft: '20px' }}>
            <button
              type="button"
              style={{ marginRight: '10px' }}
              onClick={() => navigate('/search-album')}
            >
              Add Album
            </button>
            <button type="button" onClick={() => navigate('/my-collection')}>
              Collection
            </button>
          </div>
        )}
      </div>
      <ul>
        {!loginCheck ? (
          <li className='nav-item'>
            <button type='button'>
              <Link to='/'>Login</Link>
            </button>
          </li>
        ) : (
          <li className='nav-item'>
            <button type='button' onClick={() => auth.logout()}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
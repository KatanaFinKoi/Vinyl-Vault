import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../utils/auth';
import VinylLogo from '../assets/VinylLogo.png';
import '../styles/Navbar.css';

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
    <div className="nav">
      {/* Navbar title section */}
      <div className="nav-title">
        {/* Vinyl Logo */}
        <img
          src={VinylLogo}
          className="VinylLogo"
          alt="Vinyl Logo"
          onClick={handleLogoClick}
        />
        <h2>Vinyl Vault</h2>
      </div>
  
      {/* Navbar buttons section */}
      <div className="nav-buttons">
        {/* Show Add Album and Collection buttons if logged in */}
        {loginCheck && (
          <>
            <button
              type="button"
              className="album-button"
              onClick={() => navigate("/search-album")}
            >
              Add Album
            </button>
            <button
              type="button"
              className="collection-button"
              onClick={() => navigate("/my-collection")}
            >
              Collection
            </button>
          </>
        )}
  
        {/* Login or Logout button */}
        {!loginCheck ? (
          <button type="button" className="login-button">
            Login
          </button>
        ) : (
          <button
            type="button"
            className="logout-button"
            onClick={() => auth.logout()}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}  
export default Navbar;
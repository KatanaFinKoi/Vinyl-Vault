// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import AddAlbumForm from '../components/AddAlbumForm';
// import SpotifySearch from '../components/SpotifySearch';
import VinylVaultLogo from '../assets/VinylVaultLogo.png';
import '../styles/home.css';


const Home = () => {
  const navigate = useNavigate();
  
    const goToCollection = () => {
      navigate('/my-collection');
    };

  return (
    <div className="home-container">
      <h1>
        <img src={VinylVaultLogo} className="VinylVaultLogo" alt='Vinyl Vault Logo'/>
      </h1>
      <p>
        Organize and showcase your record collection in one place.
      </p>
      <div className="flex">
        {/* Add Album Section */}
        <div className="add-album-section">
            <Link to ="/search-album">
              <h2>Add an Album Manually</h2>
            </Link>
        </div>

          <Link
            to="/my-collection"
            className="collection-button">
            View My Collection
          </Link>
      </div>
    </div>
  );
};

export default Home;

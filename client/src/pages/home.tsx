// import React from 'react';
import { Link } from 'react-router-dom';
// import AddAlbumForm from '../components/AddAlbumForm';
// import SpotifySearch from '../components/SpotifySearch';

const Home = () => {
  return (
    <div className="mx-auto w-fit bg-gray-800 text-center rounded-lg p-6">
      <h1 className="text-white font-bold text-3xl py-4">Welcome to Vinyl Vault</h1>
      <p className="text-white text-lg mb-6">
        Organize and showcase your record collection in one place.
      </p>
      <div className="flex flex-col sm:flex-row justify-around space-y-6 sm:space-y-0 sm:space-x-6">
        {/* Add Album Section */}
        <div className="flex flex-col items-center bg-gray-700 p-6 rounded">
          <h2 className="text-white font-medium text-lg mb-4">Add an Album Manually</h2>
          {/* <AddAlbumForm /> */}
        </div>

        {/* Spotify Search Section */}
        <div className="flex flex-col items-center bg-gray-700 p-6 rounded">
          <h2 className="text-white font-medium text-lg mb-4">Search for an Album on Spotify</h2>
          {/* <SpotifySearch /> */}
        </div>
      </div>

      <div className="mt-6">
        <Link
          to="/my-collection"
          className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-6 rounded"
        >
          View My Collection
        </Link>
      </div>
    </div>
  );
};

export default Home;

import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CollectionContext } from '../context/CollectionContext';

const AlbumDetails = () => {
  const { id } = useParams(); // Extract the album ID from the URL
  const { albums } = useContext(CollectionContext);
  // Find the album with the matching ID
  const album = albums.find((album: { id: number }) => album.id.toString() === id);

  // If the album is not found, show an error message
  if (!album) {
    return (
      <div className="container mx-auto p-6 bg-gray-800 text-white rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Album Not Found</h1>
        <p className="text-lg">
          We couldn't find the album you're looking for. Please return to your collection and try again.
        </p>
        <Link
          to="/my-collection"
          className="mt-4 inline-block bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-6 rounded"
        >
          Back to My Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-800 text-white rounded-lg">
      <div className="flex flex-col sm:flex-row sm:space-x-6">
        <div className="sm:w-1/3">
          <img
            src={album.art || 'https://via.placeholder.com/300'}
            alt={album.title}
            className="rounded shadow-md"
          />
        </div>
        <div className="sm:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{album.title}</h1>
          <h2 className="text-2xl text-gray-400 mb-2">{album.artist}</h2>
          <p className="text-lg mb-4">
            <strong>Genre:</strong> {album.genre || 'Unknown'}
          </p>
          <p className="text-lg mb-4">
            <strong>Release Year:</strong> {album.releaseYear || 'Unknown'}
          </p>
          <p className="text-lg">
            <strong>Description:</strong> {album.description || 'No description available.'}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <Link
          to="/my-collection"
          className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-6 rounded"
        >
          Back to My Collection
        </Link>
      </div>
    </div>
  );
};

export default AlbumDetails;

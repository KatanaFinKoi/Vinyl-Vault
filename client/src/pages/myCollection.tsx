import React, { useContext } from 'react';
import { CollectionContext } from '../context/CollectionContext';
import CollectionGrid from '../components/CollectionGrid';

const MyCollection = () => {
  const { albums } = useContext(CollectionContext);

  return (
    <div className="container mx-auto p-6 bg-gray-800 text-white rounded-lg">
      <h1 className="text-3xl font-bold mb-6">My Record Collection</h1>
      {albums.length > 0 ? (
        <CollectionGrid />
      ) : (
        <p className="text-lg">Your collection is empty. Start adding albums!</p>
      )}
    </div>
  );
};

export default MyCollection;

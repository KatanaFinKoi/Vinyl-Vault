import { useState } from 'react';
import { searchAlbums, addAlbumToDatabase } from '../api/discogsAPI';
import Deezer from '../components/deezer';

const AlbumSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [albums, setAlbums] = useState([]);
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const data = await searchAlbums(searchTerm);
      console.log('API response:', data);
      if (data && data.results) {
        setAlbums(data.results);
        setCurrentAlbumIndex(0); // Reset to the first album
      } else {
        setError('No results found');
      }
      
    } catch (error) {
      console.error('Error searching albums:', error);
      setError('Error searching albums');
    }
  };

  const handleNextAlbum = () => {
    if (currentAlbumIndex < albums.length - 1) {
      setCurrentAlbumIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevAlbum = () => {
    if (currentAlbumIndex > 0) {
      setCurrentAlbumIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleAddAlbum = async () => {
    const albumToAdd = albums[currentAlbumIndex];
    if (albumToAdd) {
      try {
        await addAlbumToDatabase(albumToAdd); // Call the function to add the album to the database
        alert('Album added successfully!');
      } catch (error) {
        console.error('Error adding album to database:', error);
        alert('Error adding album to database');
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for an album"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {albums.length > 0 && (
          <div key={albums[currentAlbumIndex].id}>
            <h3>{albums[currentAlbumIndex].title}</h3>
            <p>{albums[currentAlbumIndex].year}</p>
            <p>{albums[currentAlbumIndex].genre.join(', ')}</p>
            <p>{albums[currentAlbumIndex].label.join(', ')}</p>
            <img src={albums[currentAlbumIndex].cover_image} alt={albums[currentAlbumIndex].title} />
          </div>
        )}
      </div>

      <button onClick={handlePrevAlbum} disabled={currentAlbumIndex === 0}>
        Previous
      </button>
      <button onClick={handleNextAlbum} disabled={currentAlbumIndex >= albums.length - 1}>
        Next
      </button>
      <button onClick={handleAddAlbum} disabled={albums.length === 0}>
        Add Album
      </button>
      <Deezer />
    </div>
  );
};

export default AlbumSearch;

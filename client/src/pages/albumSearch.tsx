
import { useState } from 'react';
import { searchAlbums, addAlbumToDatabase } from '../api/discogsAPI'; // Assuming you have a function to search albums
import DeezerPlayer from '../components/deezer';
import '../styles/albumSearch.css';

const AlbumSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [albums, setAlbums] = useState<any[]>([]);
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const handleSearch = async () => {
    try {
      const data = await searchAlbums(searchTerm); // Assuming this is a function to search albums
      if (data && data.results) {
        setAlbums(data.results);
        setCurrentAlbumIndex(0); // Reset to first album
      } else {
        setError('No results found');
      }
    } catch (error) {
      setError('Error searching albums');
      console.error('Error searching albums:', error);
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
        await addAlbumToDatabase(albumToAdd); // Call to add album to the database
        alert('Album added successfully!');
      } catch (error) {
        console.error('Error adding album to database:', error);
        alert('Error adding album to database');
      }
    }
  };

  return (
    <div className="album-search-container">
    <h1 className="title">Search for Albums</h1>
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for an album"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
    {error && <p className="error-message">{error}</p>}

    {albums.length > 0 && (
      <div className="album-display">
        <img
          src={albums[currentAlbumIndex].cover_image}
          alt={albums[currentAlbumIndex].title}
          className="album-cover"
        />
        <div className="album-info">
          <h2 className="album-title">{albums[currentAlbumIndex].title}</h2>
          <p className="album-details">
            <strong>Year:</strong> {albums[currentAlbumIndex].year}
          </p>
          <p className="album-details">
            <strong>Genre:</strong> {albums[currentAlbumIndex].genre.join(', ')}
          </p>
          <p className="album-details">
            <strong>Label:</strong> {albums[currentAlbumIndex].label.join(', ')}
          </p>
        </div>
      </div>
    )}

    <div className="navigation-buttons">
      <button
        onClick={handlePrevAlbum}
        disabled={currentAlbumIndex === 0}
        className="nav-button"
      >
        Previous
      </button>
      <button
        onClick={handleNextAlbum}
        disabled={currentAlbumIndex >= albums.length - 1}
        className="nav-button"
      >
        Next
      </button>
      <button
        onClick={handleAddAlbum}
        disabled={albums.length === 0}
        className="add-button"
      >
        Add Album
      </button>
    </div>

    <div className="deezer-player">
      <DeezerPlayer albumTitle={albums[currentAlbumIndex]?.title || ''} />
    </div>
  </div>
);
};

export default AlbumSearch;
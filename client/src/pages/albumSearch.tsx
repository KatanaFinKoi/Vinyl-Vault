
import { useState } from 'react';
import { searchAlbums, addAlbumToDatabase } from '../api/discogsAPI'; // Assuming you have a function to search albums
import DeezerPlayer from '../components/deezer';

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

      {/* Pass the current album's title to the DeezerPlayer component */}
      <DeezerPlayer albumTitle={albums[currentAlbumIndex]?.title || ''} />
    </div>
  );
};

export default AlbumSearch;
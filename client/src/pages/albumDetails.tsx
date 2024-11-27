
import { useState } from 'react';
import { searchAlbums } from '../api/discogsAPI'



const AlbumSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [albums, setAlbums] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] =useState('')

  const handleSearch = async () => {
    try {
      const data = await searchAlbums(searchTerm, page);
      console.log('API response:', data)
      if (data && data.results) {
        setAlbums(data.results);
      } else {
        setError('No results found');
      }
      
    } catch (error) {
      console.error('Error searching albums:', error);
      setError('Error searching albums')
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage +1);
    handleSearch();
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage -1, 1))
  handleSearch()
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
      {error && <p style={{colr: 'red'}}> {error}</p>}
      

      <div>
        {albums.map((album) => (
          <div key={album.id}>
            <h3>{album.title}</h3>
            <p>{album.year}</p>
            <p>{album.genre.join(', ')}</p>
            <p>{album.label.join(', ')}</p>
            <img src={album.cover_image} alt={album.title} />
          </div>
        ))}
      </div>

      <button onClick={handlePrevPage} disabled={page === 1}>
        Previous
      </button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default AlbumSearch;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { fetchUserAlbums, Album} from '../api/albumAPI'
import '../styles/myCollection.css'


const MyCollection: React.FC = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const data = await fetchUserAlbums();
                setAlbums(data);
                setIsLoading(false)
            } catch (error) {
                setError('Failed to fetch albums')
            }
        }
        fetchAlbums();
    }, []);

    const handleImageClick = (albumId: number) => {
        navigate(`/album-details/${albumId}`);
    };


    if (isLoading) return <div>Loading your collection...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="my-collection">
            <h2 className='collection-title'>My Album Collection</h2>
            {albums.length === 0 ? (
                <p className='empty-collection'>No albums in your collection yet.</p>
            ) : (
                <div className="album-grid">
                    {albums.map(album => (
                        <div key={album.id} className="album-card">
                            <img 
                                src={album.cover_image} 
                                alt={`Cover of ${album.title}`} 
                                className="album-cover"
                                onClick={() => handleImageClick(album.id)}
                            />
                            <p className='album-title'>{album.title}</p>
                            <p className='album-year'>{album.year}</p>                     
                        </div>                      
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCollection;
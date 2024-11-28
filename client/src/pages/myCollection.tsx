import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';

interface Album {
    id: number;
    title: string;
    year: number;
    genre: string;
    label: string;
    cover_image: string;
}

const MyCollection: React.FC = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserAlbums = async () => {
            try {
                const token = Auth.getToken();
                const profile = Auth.getProfile();
                const userId = profile.UserId;
        
                const response = await fetch(`/api/albums/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
        
                if (!response.ok) {
                    throw new Error('Failed to fetch albums');
                }
        
                // Check if the response is JSON
                const contentType = response.headers.get('Content-Type');
                let data;
                if (contentType && contentType.includes('application/json')) {
                    data = await response.json(); // Parse as JSON if it's JSON
                } else {
                    const text = await response.text(); // Otherwise, treat it as plain text (e.g., error page)
                    console.log('Unexpected response:', text); // Log the response text
                    throw new Error('Unexpected response format');
                }
        
                setAlbums(data);
                setIsLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                setIsLoading(false);
            }
        };

        fetchUserAlbums();
    }, []);

    if (isLoading) return <div>Loading your collection...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="my-collection">
            <h2>My Album Collection</h2>
            {albums.length === 0 ? (
                <p>No albums in your collection yet.</p>
            ) : (
                <div className="album-grid">
                    {albums.map(album => (
                        <div key={album.id} className="album-card">
                            <img 
                                src={album.cover_image} 
                                alt={`Cover of ${album.title}`} 
                                className="album-cover"
                            />
                            <div className="album-details">
                                <h3>{album.title}</h3>
                                <p>{album.year} | {album.genre}</p>
                                <p>{album.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCollection;
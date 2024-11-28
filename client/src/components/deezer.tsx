import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Deezer: React.FC = () => {
    const [albumId, setAlbumId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const albumTitle = 'Abbey Road'; // Example title, can be dynamically set or passed as props
    const fallbackAlbumId = '90799'; // A fallback album ID in case Deezer search fails

    useEffect(() => {
        const fetchAlbumId = async () => {
            try {
                const response = await axios.get('/get-album-id', {
                    params: { title: albumTitle }, // Pass the album title as a query parameter
                });

                if (response.data.albumId) {
                    setAlbumId(response.data.albumId);
                } else {
                    console.log('Album not found on Deezer');
                    setAlbumId(fallbackAlbumId); // Use fallback if not found
                }
            } catch (error) {
                console.error('Error fetching album ID:', error);
                setAlbumId(fallbackAlbumId); // Use fallback on error
            } finally {
                setLoading(false); // Mark loading as complete
            }
        };

        fetchAlbumId();
    }, [albumTitle]); // Dependency ensures this runs when the album title changes

    if (loading) {
        return <p>Loading album player...</p>;
    }

    return (
        <div>
            <h3>Preview your album!</h3>
            {albumId ? (
                <iframe
                    title="Deezer album player"
                    width="700"
                    height="380"
                    src={`https://widget.deezer.com/widget/auto/album/${albumId}`}
                ></iframe>
            ) : (
                <p>Album not available</p>
            )}
        </div>
    );
};

export default Deezer;

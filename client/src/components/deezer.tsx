import React, { useEffect, useState } from 'react';

interface DeezerPlayerProps {
  albumTitle: string;
}

const DeezerPlayer: React.FC<DeezerPlayerProps> = ({ albumTitle }) => {
  const [deezerUrl, setDeezerUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (albumTitle) {
      const fetchAlbumId = async () => {
        try {
          // Search for the album by title using Deezer API
          const response = await fetch(`/api/deezer/album/${albumTitle}`);
          const data = await response.json();

          if (data && data.data.length > 0) {
            // Get the first result (or handle more results if needed)
            const albumId = data.data[0].id;
            console.log('Album ID:', albumId);
            const embedUrl = `https://widget.deezer.com/widget/dark/album/${albumId}`;
            setDeezerUrl(embedUrl);
          } else {
            setError('Album not found');
          }
        } catch (error) {
          setError('Error fetching album data');
          console.error('Error fetching album data:', error);
        }
      };

      fetchAlbumId();
    }
  }, [albumTitle]);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Preview Your Album!</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {deezerUrl ? (
        <iframe
          title="Deezer Player"
          src={deezerUrl}
          width="100%"
          height="300"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media"
          allowFullScreen
          style={{ backgroundColor: 'transparent' }}
        ></iframe>
      ) : (
        <p>Loading player...</p>
      )}
    </div>
  );
};

export default DeezerPlayer;
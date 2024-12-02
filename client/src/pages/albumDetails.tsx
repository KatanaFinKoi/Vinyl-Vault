import { useState, useEffect } from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import { deleteAlbum, fetchAlbumById, Album } from '../api/albumAPI';
import DeezerPlayer from '../components/deezer';
import '../styles/albumDetails.css';


const AlbumDetails = () => {
    const { albumId } = useParams<{ albumId: string}>();
    const navigate = useNavigate();
    const [album, setAlbum] = useState<Album | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlbumDetail = async () => {
            try {
                const data = await fetchAlbumById(albumId!);
                setAlbum(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            }
        };

        fetchAlbumDetail();
    }, [albumId]);

    const handleDelete = async () => {
        try {
            await deleteAlbum(Number(albumId));
            navigate('/my-collection');
        } catch (err) {
            setError(err instanceof Error ? err.message: 'An unknown error occured')
        }
    };

    if (error) return <div>Error: {error}</div>
    if (!album) return <div> Loading album details....</div>

    return (
        <div className="album-details-page">
            <div className='album-header'>
                <img
                    src={album.cover_image}
                    alt={`Cover of ${album.title}`}
                    className="album-cover"
                />
                <div className='album-info'>
                    <h2>{album.title}</h2>
                    <p>Released Year: {album.year}</p>
                    <p>Genre: {album.genre}</p>
                    <p>Label: {album.label}</p>
                </div>
            </div>
            <div className='album-actions'>
                <button onClick={handleDelete} className="delete-button">
                Delete Album
                </button>
            </div>
            <div className='deezer-player'>
                <DeezerPlayer albumTitle={album.title} />
            </div>
        </div>    
    );
}
export default AlbumDetails;
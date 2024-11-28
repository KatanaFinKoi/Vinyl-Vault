import axios from 'axios';
import Auth from '../utils/auth'

interface AlbumData {
    id: number;
    title: string;
    year: number;
    genre: string[];
    label: string[];
    cover_image: string;
    userId: number;
}
const searchAlbums = async (searchString: string, page: number = 1) => {
    try {
        const response = await axios.get('/discogs/search', {
            params: {
                albumName: searchString,
                page: page,
                per_page: 1,
                
            },
        });
        if (response.status !==200) {
            throw new Error('Failed to fetch Albums')
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching albums:', error);
        throw error;
    }
}

async function addAlbumToDatabase(album: AlbumData) {
    try {
        const token = Auth.getToken();
        const profile = Auth.getProfile();
        const userId = profile.UserId;   
        const albumWithUserId = {...album, userId };
        
        const response = await fetch('/api/albums', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(albumWithUserId),
            
        });
        

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Album added:', data);
        // Optionally update the UI or state here
    } catch (error) {
        console.error('Error adding album:', error);
    }
}

export { searchAlbums, addAlbumToDatabase }; 
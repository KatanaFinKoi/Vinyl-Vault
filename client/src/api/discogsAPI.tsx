import axios from 'axios';

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
        const response = await fetch('/api/albums', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(album),
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
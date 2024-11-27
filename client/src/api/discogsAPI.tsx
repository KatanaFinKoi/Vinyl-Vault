import axios from 'axios';

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
export { searchAlbums }; 
import axios from 'axios';

const DISCOGS_API_URL = 'https://api.discogs.com';

interface DiscogsSearchResponse {
    Pagination:{
        items: number;
        pages: number;
        page: number;
        per_page: number;
    };
    results: Array<{
        title: string;
        year: number;
        genre: string[];
        label: string[];
        cover_image: string;
        [key: string]: any;
    }>;

    }

    const searchString = 'REM';

export const searchAlbums = async (): Promise<DiscogsSearchResponse | null> => {
    console.log('discogs26')
    try {
        const response = await axios.get(`https://api.discogs.com/database/search?q=${searchString}&key=BrAzjPpNVWZWLhFOlDNN&secret=hChyoEgFcxYSRLEKrHQCWnyPgiyHbDBT`, {
            headers:{
            'Authorization': 'key=ZuzzsWKkrDGBmyKUebLuntWVuBuKHcUsGhxGhWbN',
            },
        });
        
        return response.data;
    } catch (error: any) {
        console.error('Error in searchAlbums:', error.message);
        return null;
    }
};

export const getAlbumDetails = async (albumId: number): Promise<any | null> => {
    try {
        const response = await axios.get(`${DISCOGS_API_URL}/releases/${albumId}`, {
            headers: {
                'User-Agent': 'Vinyl-Vault/1.0', // Recommended for Discogs API
                Authorization: `Discogs key=${process.env.DISCOGS_API_KEY}, secret=${process.env.DISCOGS_API_SECRET}`, // Required for authorization
            },
        
    });
    return response.data;
} catch (error: any) {
    console.error('Error in getAlbumDetails:', error.message);
    return null;
}

};

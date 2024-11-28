import axios from 'axios';



interface DiscogsSearchResponse {
    Pagination:{
        items: number;
        pages: number;
        page: number;
        per_page: number;
    };
    results: Array<{
        id: number
        title: string;
        year: number;
        genre: string[];
        label: string[];
        cover_image: string;
        [key: string]: any;
    }>;

    }

   

export const searchAlbums = async (searchString: string): Promise<DiscogsSearchResponse | null> => {
    console.log('discogs26')
    
    try {
        const response = await axios.get(`https://api.discogs.com/database/search?q=${searchString}&key=${process.env.DISCOGS_CONSUMER_KEY}&secret=${process.env.DISCOGS_API_SECRET}`, {
            params: {
                q: searchString,
                type: 'release',
                format: 'vinyl',
                country: 'US',
                
                
            },
            headers:{
            'Authorization': `key=${process.env.DISCOGS_API_KEY}}`,
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
        const response = await axios.get(`https://api.discogs.com/releases/${albumId}?key=${process.env.DISCOGS_CONSUMER_KEY}&secret=${process.env.DISCOGS_API_SECRET}`, {
            headers: {              
                'Authorization': `key=${process.env.DISCOGS_API_KEY}}`,
            },
        
    });
    return response.data;
} catch (error: any) {
    console.error('Error in getAlbumDetails:', error.message);
    return null;
}

};

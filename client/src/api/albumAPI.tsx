import Auth from '../utils/auth';

export interface Album {
    id: number;
    title: string;
    year: number;
    genre: string;
    label: string;
    cover_image: string;
}

export const fetchUserAlbums = async(): Promise<Album[]> => {
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
        
        const contentType = response.headers.get('Content-Type');
        let data;
        if (contentType && contentType.includes('application/json')) {
            data = await response.json(); 
        } else {
            const text = await response.text(); 
            console.log('Unexpected response:', text); 
            throw new Error('Unexpected response format');
        }

        return data;

    } catch (error) {
        console.error('Error fetching albums:', error);
        throw error;
    }    
        
};

export const deleteAlbum = async (albumId: number): Promise<void> => {
    try {
        const token = Auth.getToken();
        

        const response = await fetch (`/api/albums/${albumId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete album');
        }
    } catch (error) {
        console.error('Error deleting album:', error);
        throw error
    }
};

export const fetchAlbumById = async (albumId: string): Promise<Album> => {
    try {
        const token = Auth.getToken();

        const response = await fetch(`/api/albums/album/${albumId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch album');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching album:', error);
        throw error;
    }
};


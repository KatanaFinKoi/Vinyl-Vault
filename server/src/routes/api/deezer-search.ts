import express from 'express';
import axios from 'axios';

const DeezerSearch = express.Router(); // Define the router with a custom name

// Route to search for an album ID
DeezerSearch.get('/get-album-id', async (req, res) => {
    const { title } = req.query;

    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Album title is required' });
    }

    try {
        // Construct the Deezer API URL with the title
        const deezerUrl = `https://api.deezer.com/search/album?q=${encodeURIComponent(title)}`;
        const response = await axios.get(deezerUrl);

        // Extract the first result's album ID (if available)
        const albums = response.data.data;
        if (albums && albums.length > 0) {
            const album = albums[0]; // Take the first result
            return res.json({ albumId: album.id });
        } else {
            return res.status(404).json({ error: 'No album found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching album from deezer:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        return res.status(500).json({ error: 'Error fetching album' });
    }
});

export { DeezerSearch };
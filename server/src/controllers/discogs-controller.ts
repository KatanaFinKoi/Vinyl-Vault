
import { Request, Response } from 'express';
import { searchAlbums, getAlbumDetails } from '../models/discogs.js';



export const searchAlbumsController = async (req: Request, res: Response) => {
    
    const { albumName } = req.query;

    if (!albumName || typeof albumName !=='string') {
        res.status(400).json({ error: 'Must search album name' });
        return;
    }

    const data = await searchAlbums(albumName);
    if(data) {
        res.status(200).json(data);
    } else {
        res.status(500).json({ error: 'Error searching albums' });
    }
}


export const getAlbumDetailsController = async (req: Request, res: Response) => {
    
    const { albumId } = req.params;

    if (!albumId) {
        res.status(400).json({ error: 'Must provide album ID' });
        return;
    }

    const data = await getAlbumDetails(parseInt(albumId));
    if(data) {
        res.status(200).json(data);
    } else {
        res.status(500).json({ error: 'Error getting album details' });
    }
}
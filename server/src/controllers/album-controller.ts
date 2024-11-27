import { Album, User } from '../models/index.js'
import { type Response, type Request } from 'express'


export const saveAlbum = async (req: Request, res: Response) => {
    try {
        // Extract the album data from the request body
        const { title, year, genre, label, cover_image, userId } = req.body;

        // Validate that all required fields are provided
        if (!title || !year || !genre || !label || !cover_image || !userId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create the new album in the database
        const createdAlbum = await Album.create({
            title,
            year,
            genre,
            label,
            cover_image,
            userId,
        });

        // Check if the album was successfully created
        if (!createdAlbum) {
            return res.status(400).json({ message: 'Album not created' });
        }

        // Respond with the created album
        return res.status(201).json({
            message: 'Album created successfully',
            album: createdAlbum,
        });
    } catch (error) {
        console.error('Error creating album:', error);
        return res.status(500).json({
            message: 'Error creating album',
            error: error,
        });
    }
};
export const deleteAlbum = async (req: Request, res: Response) => {
    try {
        const deletedAlbum = await Album.destroy(
            {
                where: { id: req.params.id }
            }

        ) 
        if (!deletedAlbum) {
            return res.status(400).json({ message: 'Album not deleted' })
        }
        return res.status(200).json({ message: 'Album deleted successfully', album: deletedAlbum})
    }
    catch(error) {
        return res.status(500).json({ message: 'Error deleting album', error: error})

    }
}

export const getAlbumsForUser = async (req: Request, res: Response) => {
     const userId = req.params.id
    try {
        const user = await User.findByPk(userId, {
            include: [{model: Album, as: 'Albums'}]
        });
        if (!user) {
            throw new Error(`User with ID ${userId} was not found`)
        }
        const albums = await Album.findAll({
            where: { userId }
        })
        const userAlbums = albums.map(album => album.get({plain: true}))
        res.json(userAlbums)
    }
    catch(error){
        res.status(500).json({ message: 'Error pulling albums for user', error: error})


    }
}    

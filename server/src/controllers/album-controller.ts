import { Album } from '../models/index.js'
import { type Response, type Request } from 'express'

export const saveAlbum = async (req: Request, res: Response) => {
    try {
        const createdAlbum = await Album.create(req.body)
        if (!createdAlbum) {
            return res.status(400).json({ message: 'Album not created' })
        } 
        return res.status(201).json({ message: 'Album created successfully', album: createdAlbum})
    }
    catch(error) {
        return res.status(500).json({ message: 'Error creating album', error: error})

    }
}
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


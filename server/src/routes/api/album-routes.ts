import { saveAlbum, deleteAlbum, getAlbumsForUser, getAlbumById} from '../../controllers/album-controller.js'
import express from 'express'

const router = express.Router()

router.get('/:id', getAlbumsForUser )
router.post('/', saveAlbum)
router.get('/album/:albumId', getAlbumById)
router.delete('/:id', deleteAlbum)

export { router as albumRouter } 
import { saveAlbum, deleteAlbum, getAlbumsForUser} from '../../controllers/album-controller.js'
import express from 'express'

const router = express.Router()

router.get('/:id', getAlbumsForUser )
router.post('/', saveAlbum)
router.delete('/:id', deleteAlbum)

export { router as albumRouter } 
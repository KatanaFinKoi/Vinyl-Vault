import { saveAlbum, deleteAlbum } from '../../controllers/album-controller.js'
import express from 'express'

const router = express.Router()

router.post('/', saveAlbum)
router.delete('/:id', deleteAlbum)

export { router as albumRouter } 
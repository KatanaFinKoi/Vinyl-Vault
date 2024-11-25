import express from 'express';
import { searchAlbumsController, getAlbumDetailsController } from '../controllers/discogs-controller.js';


const router = express.Router();

// Route to search for releases
router.get('/search', searchAlbumsController);

router.get('/details/:albumId', getAlbumDetailsController);

export {router as discogsRoutes};
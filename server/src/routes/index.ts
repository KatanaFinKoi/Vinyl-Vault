import { Router } from 'express';
import authRoutes from './auth-routes.js';
import { authenticateToken } from '../middleware/auth.js';
import  { discogsRoutes } from './discogs-routes.js';
import { userRouter } from './api/user-routes.js';
import { albumRouter } from './api/album-routes.js';
import { createUser } from '../controllers/user-controller.js';
import { deezerRouter} from './api/deezer-search.js';


const router = Router();

router.use('/auth', authRoutes);
router.post('/users', createUser);
router.use('/discogs', discogsRoutes);
router.use('/api/albums', authenticateToken, albumRouter);
router.use('/api/users', authenticateToken, userRouter);
router.use('/api/deezer', deezerRouter);

export default router;

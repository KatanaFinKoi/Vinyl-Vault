import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
import  { discogsRoutes } from './discogs-routes.js';


const router = Router();

router.use('/auth', authRoutes);
router.use('/discogs', discogsRoutes);
router.use('/api', authenticateToken, apiRoutes);

export default router;

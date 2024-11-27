import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import  { discogsRoutes } from './discogs-routes.js';


const router = Router();

router.use('/auth', authRoutes);
router.use('/discogs', discogsRoutes);
router.use('/api', apiRoutes);

export default router;

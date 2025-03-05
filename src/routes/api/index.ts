import { Router } from 'express';
const router = Router();
import thoughtRoutes from './thoughtRoutes';
import userRoutes from './userRoutes';

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;

import { Router } from 'express';
import { login } from '../controllers/AUTHS';

const router = Router();

router.post('/LOGIN', login);

export default router;
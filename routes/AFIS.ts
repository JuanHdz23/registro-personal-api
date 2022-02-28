import { Router } from 'express';
import { getAfisId, postAfis, putAfis } from '../controllers/AFIS';

const router = Router();

router.get('/GetAFISId/:CLAVE_LUGAR&:ANIO&:CONTROL', getAfisId);
router.post('/PostAFIS', postAfis);
router.put('/PutAFIS/:CLAVE_LUGAR&:ANIO&:CONTROL&:USUARIO', putAfis);

export default router;
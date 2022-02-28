import { Router } from 'express';
import { getRnpspId, postRnpsp, putRnpsp } from '../controllers/RNPSP';

const router = Router();

router.get('/GetRNPSPId/:CLAVE_LUGAR&:ANIO&:CONTROL', getRnpspId);
router.post('/PostRNPSP', postRnpsp);
router.put('/PutRNPSP/:CLAVE_LUGAR&:ANIO&:CONTROL&:USUARIO', putRnpsp);

export default router;
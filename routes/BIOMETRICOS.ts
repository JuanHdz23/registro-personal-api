import { Router } from 'express';
import { getBiometricosId, postBiometricos, putBiometricos } from '../controllers/BIOMETRICOS';

const router = Router();

router.get('/GetBIOMETRICOSId/:CLAVE_LUGAR&:ANIO&:CONTROL', getBiometricosId);
router.post('/PostBIOMETRICOS', postBiometricos);
router.put('/PutBIOMETRICOS/:CLAVE_LUGAR&:ANIO&:CONTROL&:USUARIO', putBiometricos);

export default router;
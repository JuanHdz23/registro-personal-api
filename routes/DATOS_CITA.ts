import { Router } from 'express';
import { getCitas, getCita, getExpedienteClaveLugar, postCita, putCita } from '../controllers/DATOS_CITAS';

const router = Router();

router.get('/GetDATOS_CITAS', getCitas);
router.get('/GetDATOS_CITAId/:CLAVE_LUGAR&:ANIO&:CONTROL', getCita);
router.get('/GetDATOS_EXPEDIENTEId/:CLAVE_LUGAR', getExpedienteClaveLugar);
router.post('/PostDATOS_EXPEDIENTE', postCita);
router.put('/PutDATOS_EXPEDIENTE/:CLAVE_LUGAR&:ANIO&:CONTROL&:USUARIO', putCita);

export default router;
import { Router } from 'express';
import { getActividadesId, postExpediente } from '../controllers/ACTIVIDADES';

const router = Router();

// router.get('/GetACTIVIDADES', getActividades);
router.get('/GetACTIVIDADESId/:CLAVE_LUGAR&:ANIO&:CONTROL', getActividadesId);
// router.post('/PostACTIVIDAD', postExpediente);

export default router;
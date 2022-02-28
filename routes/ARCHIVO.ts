import { Router } from 'express';
import { getArchivoId, postArchivo, putArchivo } from '../controllers/ARCHIVO';

const router = Router();

// router.get('/GetACTIVIDADES', getActividades);
router.get('/GetARCHIVOId/:CLAVE_LUGAR&:ANIO&:CONTROL', getArchivoId);
router.post('/PostARCHIVO', postArchivo);
router.put('/PutARCHIVO/:CLAVE_LUGAR&:ANIO&:CONTROL&:USUARIO', putArchivo);

export default router;
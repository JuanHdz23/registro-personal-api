import { Router } from 'express';
import { getDocumentosId, getDocumentosExisten, postDocumentos, putDocumentos } from '../controllers/DOCUMENTOS';

const router = Router();

router.get('/GetDOCUMENTOSExisten/:CLAVE_LUGAR&:ANIO&:CONTROL', getDocumentosExisten);
router.get('/GetDOCUMENTOSId/:CLAVE_LUGAR&:ANIO&:CONTROL&:TIPO', getDocumentosId);
router.post('/PostDOCUMENTOS', postDocumentos);
router.put('/PutDOCUMENTOS/:CLAVE_LUGAR&:ANIO&:CONTROL&:TIPO', putDocumentos);

export default router;
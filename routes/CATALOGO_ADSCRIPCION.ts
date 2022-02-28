import { Router } from 'express';
import { getAdscripciones } from '../controllers/CATALOGO_ADSCRIPCION';

const router = Router();

router.get('/GetCATALOGO_ADSCRIPCION', getAdscripciones);

export default router;
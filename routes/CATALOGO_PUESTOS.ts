import { Router } from 'express';
import { getPuestos } from '../controllers/CATALOGO_PUESTOS';

const router = Router();

router.get('/GetCATALOGO_PUESTOS/:ADSCRIPCION', getPuestos);

export default router;
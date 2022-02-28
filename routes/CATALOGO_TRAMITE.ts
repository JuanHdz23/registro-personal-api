import { Router } from 'express';
import { getTramite } from '../controllers/CATALOGO_TRAMITE';

const router = Router();

router.get('/GetCATALOGO_TRAMITE', getTramite);

export default router;
import { Router } from 'express';
import { getUsuarios, 
         getUsuario, 
         postUsuario, 
         putUsuario, 
         deleteUsuario } from '../controllers/USUARIOS';

const router = Router();

router.get('/GetUSUARIOS', getUsuarios);
router.get('/GetUSUARIOId/:CONTROL', getUsuario);
router.post('/PostUSUARIO', postUsuario);
router.put('/PutUSUARIO/:CONTROL', putUsuario);
router.delete('/:CONTROL', deleteUsuario);

export default router;
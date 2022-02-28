"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ARCHIVO_1 = require("../controllers/ARCHIVO");
const router = express_1.Router();
// router.get('/GetACTIVIDADES', getActividades);
router.get('/GetARCHIVOId/:CLAVE_LUGAR&:ANIO&:CONTROL', ARCHIVO_1.getArchivoId);
router.post('/PostARCHIVO', ARCHIVO_1.postArchivo);
router.put('/PutARCHIVO/:CLAVE_LUGAR&:ANIO&:CONTROL&:USUARIO', ARCHIVO_1.putArchivo);
exports.default = router;
//# sourceMappingURL=ARCHIVO.js.map
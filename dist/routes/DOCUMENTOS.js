"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DOCUMENTOS_1 = require("../controllers/DOCUMENTOS");
const router = express_1.Router();
router.get('/GetDOCUMENTOSExisten/:CLAVE_LUGAR&:ANIO&:CONTROL', DOCUMENTOS_1.getDocumentosExisten);
router.get('/GetDOCUMENTOSId/:CLAVE_LUGAR&:ANIO&:CONTROL&:TIPO', DOCUMENTOS_1.getDocumentosId);
router.post('/PostDOCUMENTOS', DOCUMENTOS_1.postDocumentos);
router.put('/PutDOCUMENTOS/:CLAVE_LUGAR&:ANIO&:CONTROL&:TIPO', DOCUMENTOS_1.putDocumentos);
exports.default = router;
//# sourceMappingURL=DOCUMENTOS.js.map
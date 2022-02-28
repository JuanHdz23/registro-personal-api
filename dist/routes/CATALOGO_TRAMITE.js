"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CATALOGO_TRAMITE_1 = require("../controllers/CATALOGO_TRAMITE");
const router = express_1.Router();
router.get('/GetCATALOGO_TRAMITE', CATALOGO_TRAMITE_1.getTramite);
exports.default = router;
//# sourceMappingURL=CATALOGO_TRAMITE.js.map
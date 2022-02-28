"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putAfis = exports.postAfis = exports.getAfisId = void 0;
const AFIS_1 = __importDefault(require("../models/AFIS"));
const ACTIVIDADES_1 = require("../controllers/ACTIVIDADES");
const getAfisId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CLAVE_LUGAR, ANIO, CONTROL } = req.params;
    const afis = yield AFIS_1.default.findAll({
        where: {
            CLAVE_LUGAR,
            ANIO,
            CONTROL
        }
    });
    if (!afis) {
        res.status(404).json({
            msg: `No existen afis con el CONTROL ${CONTROL}`
        });
    }
    res.json({
        afis
    });
});
exports.getAfisId = getAfisId;
const cleanFecha = (date) => {
    return date ? date : null;
};
const postAfis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const year = new Date().getFullYear().toString();
        body.ANIO = year;
        body.FECHA_ENTRADA = cleanFecha(body.FECHA_ENTRADA);
        body.FECHA_SALIDA = cleanFecha(body.FECHA_SALIDA);
        const date = new Date().toISOString();
        body.FCH_REG = date;
        body.FCH_UAC = date;
        const afis = new AFIS_1.default(body);
        yield afis.save();
        const actividad = 'Se creo registro de afis';
        ACTIVIDADES_1.postActividades(body, actividad);
        res.json({
            afis
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador del sistema',
            error
        });
    }
});
exports.postAfis = postAfis;
const putAfis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CLAVE_LUGAR, ANIO, CONTROL, USUARIO } = req.params;
    const { body } = req;
    try {
        const afis = yield AFIS_1.default.findOne({
            where: {
                CLAVE_LUGAR,
                ANIO,
                CONTROL
            }
        });
        if (!afis) {
            return res.status(400).json({
                msg: `No existe información con el CONTROL ${CONTROL}`
            });
        }
        yield afis.update(body);
        body.CLAVE_LUGAR = CLAVE_LUGAR;
        body.ANIO = ANIO;
        body.CONTROL = CONTROL;
        body.USUARIO = USUARIO;
        const actividad = 'Se modifico registro de afis';
        ACTIVIDADES_1.postActividades(body, actividad);
        res.json({
            afis
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador',
            error
        });
    }
});
exports.putAfis = putAfis;
//# sourceMappingURL=AFIS.js.map
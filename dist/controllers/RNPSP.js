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
exports.putRnpsp = exports.postRnpsp = exports.getRnpspId = void 0;
const RNPSP_1 = __importDefault(require("../models/RNPSP"));
const ACTIVIDADES_1 = require("../controllers/ACTIVIDADES");
const getRnpspId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CLAVE_LUGAR, ANIO, CONTROL } = req.params;
    const rnpsp = yield RNPSP_1.default.findAll({
        where: {
            CLAVE_LUGAR,
            ANIO,
            CONTROL
        }
    });
    if (!rnpsp) {
        res.status(404).json({
            msg: `No existen rnpsp con el CONTROL ${CONTROL}`
        });
    }
    res.json({
        rnpsp
    });
});
exports.getRnpspId = getRnpspId;
const cleanFecha = (date) => {
    return date ? date : null;
};
const postRnpsp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const year = new Date().getFullYear().toString();
        body.ANIO = year;
        body.FECHA_CREACION_CUIP = cleanFecha(body.FECHA_CREACION_CUIP);
        body.FECHA_ENTREGA_CUIP = cleanFecha(body.FECHA_ENTREGA_CUIP);
        const date = new Date().toISOString();
        body.FCH_REG = date;
        body.FCH_UAC = date;
        const RNPSP = new RNPSP_1.default(body);
        yield RNPSP.save();
        const actividad = 'Se creo registro de RNPSP';
        ACTIVIDADES_1.postActividades(body, actividad);
        res.json({
            RNPSP
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador del sistema',
            error
        });
    }
});
exports.postRnpsp = postRnpsp;
const putRnpsp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CLAVE_LUGAR, ANIO, CONTROL, USUARIO } = req.params;
    const { body } = req;
    try {
        const rnpsp = yield RNPSP_1.default.findOne({
            where: {
                CLAVE_LUGAR,
                ANIO,
                CONTROL
            }
        });
        if (!rnpsp) {
            return res.status(400).json({
                msg: `No existe información con el CONTROL ${CONTROL}`
            });
        }
        yield rnpsp.update(body);
        body.CLAVE_LUGAR = CLAVE_LUGAR;
        body.ANIO = ANIO;
        body.CONTROL = CONTROL;
        body.USUARIO = USUARIO;
        const actividad = 'Se modifico registro de rnpsp';
        ACTIVIDADES_1.postActividades(body, actividad);
        res.json({
            rnpsp
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador',
            error
        });
    }
});
exports.putRnpsp = putRnpsp;
//# sourceMappingURL=RNPSP.js.map
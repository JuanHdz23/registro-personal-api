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
exports.putArchivo = exports.postArchivo = exports.getArchivoId = void 0;
const ARCHIVO_1 = __importDefault(require("../models/ARCHIVO"));
const ACTIVIDADES_1 = require("../controllers/ACTIVIDADES");
const getArchivoId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CLAVE_LUGAR, ANIO, CONTROL } = req.params;
    const archivo = yield ARCHIVO_1.default.findAll({
        where: {
            CLAVE_LUGAR,
            ANIO,
            CONTROL
        }
    });
    if (!archivo) {
        res.status(404).json({
            msg: `No existen archivo con el CONTROL ${CONTROL}`
        });
    }
    res.json({
        archivo
    });
});
exports.getArchivoId = getArchivoId;
const cleanFecha = (date) => {
    return date ? date : null;
};
const postArchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const year = new Date().getFullYear().toString();
        body.ANIO = year;
        body.FECHA_CIERRE = cleanFecha(body.FECHA_CIERRE);
        const date = new Date().toISOString();
        body.FCH_REG = date;
        body.FCH_UAC = date;
        const archivo = new ARCHIVO_1.default(body);
        yield archivo.save();
        const actividad = 'Se creo registro de archivo';
        ACTIVIDADES_1.postActividades(body, actividad);
        res.json({
            archivo
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador del sistema',
            error
        });
    }
});
exports.postArchivo = postArchivo;
const putArchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CLAVE_LUGAR, ANIO, CONTROL, USUARIO } = req.params;
    const { body } = req;
    try {
        const archivo = yield ARCHIVO_1.default.findOne({
            where: {
                CLAVE_LUGAR,
                ANIO,
                CONTROL
            }
        });
        if (!archivo) {
            return res.status(400).json({
                msg: `No existe información con el CONTROL ${CONTROL}`
            });
        }
        const date = new Date().toISOString();
        body.FCH_UAC = date;
        yield archivo.update(body);
        body.CLAVE_LUGAR = CLAVE_LUGAR;
        body.ANIO = ANIO;
        body.CONTROL = CONTROL;
        body.USUARIO = USUARIO;
        const actividad = 'Se modifico registro de archivo';
        ACTIVIDADES_1.postActividades(body, actividad);
        res.json({
            archivo
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador',
            error
        });
    }
});
exports.putArchivo = putArchivo;
//# sourceMappingURL=ARCHIVO.js.map
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
exports.putDocumentos = exports.postDocumentos = exports.getDocumentosExisten = exports.getDocumentosId = void 0;
const DOCUMENTOS_1 = __importDefault(require("../models/DOCUMENTOS"));
const getDocumentosId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CLAVE_LUGAR, ANIO, CONTROL, TIPO } = req.params;
    const documentos = yield DOCUMENTOS_1.default.findAll({
        where: {
            CLAVE_LUGAR,
            ANIO,
            CONTROL,
            TIPO
        }
    });
    if (!documentos) {
        res.status(404).json({
            msg: `No existen documentos con el CONTROL ${CONTROL} y tipo ${TIPO}`
        });
    }
    if (documentos.length > 0) {
        for (let i = 0; i < documentos.length; i++) {
            documentos[i].get().DOCUMENTO = documentos[i].get().DOCUMENTO.toString('utf-8');
        }
    }
    res.json({
        documentos
    });
});
exports.getDocumentosId = getDocumentosId;
const getDocumentosExisten = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CLAVE_LUGAR, ANIO, CONTROL } = req.params;
    const documentos = yield DOCUMENTOS_1.default.findAll({
        where: {
            CLAVE_LUGAR,
            ANIO,
            CONTROL
        }
    });
    const numbers = [];
    documentos.map(documento => {
        numbers.push(documento.get().TIPO);
    });
    const specimens = numbers.filter((number, i) => i == 0 ? true : numbers[i - 1] != number);
    const tipos = specimens.map(spec => {
        return { number: spec, count: 0 };
    });
    tipos.map((countSpec, i) => {
        const actualSpecLength = numbers.filter(number => number === countSpec.number).length;
        countSpec.count = actualSpecLength;
    });
    res.json({
        tipos
    });
});
exports.getDocumentosExisten = getDocumentosExisten;
const postDocumentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const date = new Date().toISOString();
        body.FCH_REG = date;
        body.FCH_UAC = date;
        for (let i = 0; i < body.DOCUMENTO.length; i++) {
            const documentoBuffer = Buffer.from(body.DOCUMENTO[i], 'utf-8');
            const documento = {
                CLAVE_LUGAR: body.CLAVE_LUGAR,
                ANIO: body.ANIO,
                CONTROL: body.CONTROL,
                TIPO: body.TIPO,
                ID: i + 1,
                DOCUMENTO: documentoBuffer,
                OBSERVACIONES: body.OBSERVACIONES,
                USUARIO: body.USUARIO,
                FCH_REG: body.FCH_REG,
                FCH_UAC: body.FCH_UAC,
            };
            const documentos = new DOCUMENTOS_1.default(documento);
            yield documentos.save();
        }
        res.status(200).json();
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador del sistema',
            error
        });
    }
});
exports.postDocumentos = postDocumentos;
const putDocumentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CLAVE_LUGAR, ANIO, CONTROL, TIPO } = req.params;
    const { body } = req;
    try {
        yield DOCUMENTOS_1.default.destroy({
            where: {
                CLAVE_LUGAR,
                ANIO,
                CONTROL,
                TIPO
            }
        });
        const date = new Date().toISOString();
        body.FCH_REG = date;
        body.FCH_UAC = date;
        for (let i = 0; i < body.DOCUMENTO.length; i++) {
            const documentoBuffer = Buffer.from(body.DOCUMENTO[i], 'utf-8');
            const documento = {
                CLAVE_LUGAR: body.CLAVE_LUGAR,
                ANIO: body.ANIO,
                CONTROL: body.CONTROL,
                TIPO: body.TIPO,
                ID: i + 1,
                DOCUMENTO: documentoBuffer,
                OBSERVACIONES: body.OBSERVACIONES,
                USUARIO: body.USUARIO,
                FCH_REG: body.FCH_REG,
                FCH_UAC: body.FCH_UAC,
            };
            const documentos = new DOCUMENTOS_1.default(documento);
            yield documentos.save();
        }
        res.status(200).json();
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador',
            error
        });
    }
});
exports.putDocumentos = putDocumentos;
//# sourceMappingURL=DOCUMENTOS.js.map
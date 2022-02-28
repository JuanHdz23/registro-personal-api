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
const express_1 = __importDefault(require("express"));
const ACTIVIDADES_1 = __importDefault(require("../routes/ACTIVIDADES"));
const AFIS_1 = __importDefault(require("../routes/AFIS"));
const ARCHIVO_1 = __importDefault(require("../routes/ARCHIVO"));
const AUTH_1 = __importDefault(require("../routes/AUTH"));
const BIOMETRICOS_1 = __importDefault(require("../routes/BIOMETRICOS"));
const CATALOGO_ADSCRIPCION_1 = __importDefault(require("../routes/CATALOGO_ADSCRIPCION"));
const CATALOGO_PUESTOS_1 = __importDefault(require("../routes/CATALOGO_PUESTOS"));
const CATALOGO_TRAMITE_1 = __importDefault(require("../routes/CATALOGO_TRAMITE"));
const DATOS_CITA_1 = __importDefault(require("../routes/DATOS_CITA"));
const DOCUMENTOS_1 = __importDefault(require("../routes/DOCUMENTOS"));
const RNPSP_1 = __importDefault(require("../routes/RNPSP"));
const USUARIO_1 = __importDefault(require("../routes/USUARIO"));
const test_1 = __importDefault(require("../routes/test"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.apiPaths = {
            ACTIVIDADES: '/api/ACTIVIDADES',
            AFIS: '/api/AFIS',
            ARCHIVO: '/api/ARCHIVO',
            AUTH: '/api/AUTH',
            BIOMETRICOS: '/api/BIOMETRICOS',
            CATALOGO_ADSCRIPCION: '/api/CATALOGO_ADSCRIPCION',
            CATALOGO_PUESTOS: '/api/CATALOGO_PUESTOS',
            CATALOGO_TRAMITE: '/api/CATALOGO_TRAMITE',
            DATOS_CITA: '/api/DATOS_CITA',
            DOCUMENTOS: '/api/DOCUMENTOS',
            RNPSP: '/api/RNPSP',
            USUARIO: '/api/USUARIO',
            TEST: '/api',
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    // TODO: Conectar a base de datos
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Database online');
            }
            catch (error) {
                // throw new Error( error );
                console.log(error);
            }
        });
    }
    middlewares() {
        // CORS
        this.app.use(cors_1.default());
        // Lectura del body
        this.app.use(express_1.default.json({ limit: '50mb' }));
        // Carpeta pública
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.ACTIVIDADES, ACTIVIDADES_1.default);
        this.app.use(this.apiPaths.AFIS, AFIS_1.default);
        this.app.use(this.apiPaths.ARCHIVO, ARCHIVO_1.default);
        this.app.use(this.apiPaths.AUTH, AUTH_1.default);
        this.app.use(this.apiPaths.BIOMETRICOS, BIOMETRICOS_1.default);
        this.app.use(this.apiPaths.CATALOGO_ADSCRIPCION, CATALOGO_ADSCRIPCION_1.default);
        this.app.use(this.apiPaths.CATALOGO_PUESTOS, CATALOGO_PUESTOS_1.default);
        this.app.use(this.apiPaths.CATALOGO_TRAMITE, CATALOGO_TRAMITE_1.default);
        this.app.use(this.apiPaths.DATOS_CITA, DATOS_CITA_1.default);
        this.app.use(this.apiPaths.DOCUMENTOS, DOCUMENTOS_1.default);
        this.app.use(this.apiPaths.RNPSP, RNPSP_1.default);
        this.app.use(this.apiPaths.USUARIO, USUARIO_1.default);
        this.app.use(this.apiPaths.TEST, test_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map
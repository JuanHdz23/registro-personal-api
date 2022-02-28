import express, { Application } from 'express';
import ACTIVIDADES_Routes from '../routes/ACTIVIDADES';
import AFIS_Routes from '../routes/AFIS';
import ARCHIVO_Routes from '../routes/ARCHIVO';
import AUTH_Routes from '../routes/AUTH';
import BIOMETRICOS_Routes from '../routes/BIOMETRICOS';
import CATALOGO_ADSCRIPCION_Routes from '../routes/CATALOGO_ADSCRIPCION';
import CATALOGO_PUESTOS_Routes from '../routes/CATALOGO_PUESTOS';
import CATALOGO_TRAMITE_Routes from '../routes/CATALOGO_TRAMITE';
import DATOS_CITA_Routes from '../routes/DATOS_CITA';
import DOCUMENTOS_Routes from '../routes/DOCUMENTOS';
import RNPSP_Routes from '../routes/RNPSP';
import USER_Routes from '../routes/USUARIO';
import test_Routes from '../routes/test';
import cors from 'cors';
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string ;
    private apiPaths = {
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
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    // TODO: Conectar a base de datos
    async dbConnection() {
        try {

            await db.authenticate();
            console.log('Database online');
            
        } catch (error) {
            // throw new Error( error );
            console.log(error);
        }
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json({ limit: '50mb' }) );

        // Carpeta pública
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.apiPaths.ACTIVIDADES, ACTIVIDADES_Routes );
        this.app.use( this.apiPaths.AFIS, AFIS_Routes );
        this.app.use( this.apiPaths.ARCHIVO, ARCHIVO_Routes );
        this.app.use( this.apiPaths.AUTH, AUTH_Routes );
        this.app.use( this.apiPaths.BIOMETRICOS, BIOMETRICOS_Routes );
        this.app.use( this.apiPaths.CATALOGO_ADSCRIPCION, CATALOGO_ADSCRIPCION_Routes );
        this.app.use( this.apiPaths.CATALOGO_PUESTOS, CATALOGO_PUESTOS_Routes );
        this.app.use( this.apiPaths.CATALOGO_TRAMITE, CATALOGO_TRAMITE_Routes );
        this.app.use( this.apiPaths.DATOS_CITA, DATOS_CITA_Routes );
        this.app.use( this.apiPaths.DOCUMENTOS, DOCUMENTOS_Routes );
        this.app.use( this.apiPaths.RNPSP, RNPSP_Routes );
        this.app.use( this.apiPaths.USUARIO, USER_Routes );
        this.app.use( this.apiPaths.TEST, test_Routes );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}

export default Server;
import { Request, Response } from 'express';
import ARCHIVO from '../models/ARCHIVO';
import { postActividades } from '../controllers/ACTIVIDADES';

export const getArchivoId = async( req: Request, res: Response ) => {

    const { CLAVE_LUGAR, ANIO, CONTROL } = req.params;

    const archivo = await ARCHIVO.findAll({ 
        where: {
            CLAVE_LUGAR,
            ANIO,
            CONTROL
        }
    });

    if ( !archivo ) {
        res.status(404).json({
            msg: `No existen archivo con el CONTROL ${ CONTROL }`
        });
    }

    res.json({
        archivo
    });
};

const cleanFecha = ( date: any ) => {
    return date ? date : null;
}

export const postArchivo = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const year = new Date().getFullYear().toString();
        body.ANIO = year;

        body.FECHA_CIERRE = cleanFecha( body.FECHA_CIERRE );

        const date = new Date().toISOString();
        body.FCH_REG = date;  
        body.FCH_UAC = date;
        
        const archivo = new (ARCHIVO as any)( body );
        await archivo.save();

        const actividad = 'Se creo registro de archivo';
        postActividades(body, actividad);

        res.json({
            archivo
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador del sistema',
            error
        });
    }
};

export const putArchivo = async( req: Request, res: Response ) => {

    const { CLAVE_LUGAR, ANIO, CONTROL, USUARIO } = req.params;
    const { body } = req;

    try {
        const archivo = await ARCHIVO.findOne({
            where: {
                CLAVE_LUGAR,
                ANIO,
                CONTROL
            }
        });

        if( !archivo ) {
            return res.status(400).json({
                msg: `No existe información con el CONTROL ${ CONTROL }`
            });
        }

        const date = new Date().toISOString();
        body.FCH_UAC = date;

        await archivo.update( body );

        body.CLAVE_LUGAR = CLAVE_LUGAR;
        body.ANIO = ANIO;
        body.CONTROL = CONTROL;
        body.USUARIO = USUARIO;

        const actividad = 'Se modifico registro de archivo';
        postActividades(body, actividad);
        
        res.json({
            archivo 
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador',
            error
        });
    }
};
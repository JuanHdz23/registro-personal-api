import { Request, Response } from 'express';
import RNPSP2 from '../models/RNPSP';
import { postActividades } from '../controllers/ACTIVIDADES';
import bcrypt  from 'bcrypt';

export const getRnpspId = async( req: Request, res: Response ) => {

    const { CLAVE_LUGAR, ANIO, CONTROL } = req.params;

    const rnpsp = await RNPSP2.findAll({ 
        where: {
            CLAVE_LUGAR,
            ANIO,
            CONTROL
        }
    });

    if ( !rnpsp ) {
        res.status(404).json({
            msg: `No existen rnpsp con el CONTROL ${ CONTROL }`
        });
    }
    
    res.json({
        rnpsp
    });
};

const cleanFecha = ( date: any ) => {
    return date ? date : null;
}

export const postRnpsp = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const year = new Date().getFullYear().toString();
        body.ANIO = year;

        body.FECHA_CREACION_CUIP = cleanFecha( body.FECHA_CREACION_CUIP );
        body.FECHA_ENTREGA_CUIP = cleanFecha( body.FECHA_ENTREGA_CUIP );

        const date = new Date().toISOString();
        body.FCH_REG = date;  
        body.FCH_UAC = date;
        
        const RNPSP = new (RNPSP2 as any)( body );
        await RNPSP.save();

        const actividad = 'Se creo registro de RNPSP';
        postActividades(body, actividad);

        res.json({
            RNPSP
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador del sistema',
            error
        });
    }
};

export const putRnpsp = async( req: Request, res: Response ) => {

    const { CLAVE_LUGAR, ANIO, CONTROL, USUARIO } = req.params;
    const { body } = req;

    try {
        const rnpsp = await RNPSP2.findOne({
            where: {
                CLAVE_LUGAR,
                ANIO,
                CONTROL
            }
        });

        if( !rnpsp ) {
            return res.status(400).json({
                msg: `No existe información con el CONTROL ${ CONTROL }`
            });
        }

        await rnpsp.update( body );

        body.CLAVE_LUGAR = CLAVE_LUGAR;
        body.ANIO = ANIO;
        body.CONTROL = CONTROL;
        body.USUARIO = USUARIO;

        const actividad = 'Se modifico registro de rnpsp';
        postActividades(body, actividad);
        
        res.json({
            rnpsp 
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador',
            error
        });
    }
};
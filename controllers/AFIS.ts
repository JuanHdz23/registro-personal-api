import { Request, Response } from 'express';
import AFIS from '../models/AFIS';
import { postActividades } from '../controllers/ACTIVIDADES';

export const getAfisId = async( req: Request, res: Response ) => {

    const { CLAVE_LUGAR, ANIO, CONTROL } = req.params;

    const afis = await AFIS.findAll({ 
        where: {
            CLAVE_LUGAR,
            ANIO,
            CONTROL
        }
    });

    if ( !afis ) {
        res.status(404).json({
            msg: `No existen afis con el CONTROL ${ CONTROL }`
        });
    }

    res.json({
        afis
    });
};

const cleanFecha = ( date: any ) => {
    return date ? date : null;
}

export const postAfis = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const year = new Date().getFullYear().toString();
        body.ANIO = year;

        body.FECHA_ENTRADA = cleanFecha( body.FECHA_ENTRADA );
        body.FECHA_SALIDA = cleanFecha( body.FECHA_SALIDA );

        const date = new Date().toISOString();
        body.FCH_REG = date;  
        body.FCH_UAC = date;
        
        const afis = new (AFIS as any)( body );
        await afis.save();

        const actividad = 'Se creo registro de afis';
        postActividades(body, actividad);

        res.json({
            afis
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador del sistema',
            error
        });
    }
};

export const putAfis = async( req: Request, res: Response ) => {

    const { CLAVE_LUGAR, ANIO, CONTROL, USUARIO } = req.params;
    const { body } = req;

    try {
        const afis = await AFIS.findOne({
            where: {
                CLAVE_LUGAR,
                ANIO,
                CONTROL
            }
        });

        if( !afis ) {
            return res.status(400).json({
                msg: `No existe información con el CONTROL ${ CONTROL }`
            });
        }

        await afis.update( body );

        body.CLAVE_LUGAR = CLAVE_LUGAR;
        body.ANIO = ANIO;
        body.CONTROL = CONTROL;
        body.USUARIO = USUARIO;

        const actividad = 'Se modifico registro de afis';
        postActividades(body, actividad);
        
        res.json({
            afis 
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador',
            error
        });
    }
};
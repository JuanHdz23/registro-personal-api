import { Request, Response } from 'express';
import BIOMETRICOS from '../models/BIOMETRICOS';
import { postActividades } from '../controllers/ACTIVIDADES';

export const getBiometricosId = async( req: Request, res: Response ) => {

    const { CLAVE_LUGAR, ANIO, CONTROL } = req.params;

    const biometricos = await BIOMETRICOS.findAll({ 
        where: {
            CLAVE_LUGAR,
            ANIO,
            CONTROL
        }
    });

    if ( !biometricos ) {
        res.status(404).json({
            msg: `No existen biometricos con el CONTROL ${ CONTROL }`
        });
    }

    res.json({
        biometricos
    });
};

const cleanFecha = ( date: any ) => {
    return date ? date : null;
}

export const postBiometricos = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const year = new Date().getFullYear().toString();
        body.ANIO = year;

        body.RECIP = cleanFecha( body.RECIP );
        body.DOCS_RECIP = cleanFecha( body.DOCS_RECIP );
        body.HUELLAS = cleanFecha( body.HUELLAS );
        body.CUIP = cleanFecha( body.CUIP );
        body.CIB_RECIP = cleanFecha( body.CIB_RECIP );
        body.RNPSP = cleanFecha( body.RNPSP ); 
        body.DOCS_RNPSP = cleanFecha( body.DOCS_RNPSP );
        body.CIB_RNPSP = cleanFecha( body.CIB_RNPSP );
        body.CARGO_FOTOS = cleanFecha( body.CARGO_FOTOS );
        body.FICHA_HUELLAS = cleanFecha( body.FICHA_HUELLAS );
        body.VOZ = cleanFecha( body.VOZ );
        body.LIGA_FACIAL = cleanFecha( body.LIGA_FACIAL );

        const date = new Date().toISOString();
        body.FCH_REG = date;  
        body.FCH_UAC = date;
        
        const biometricos = new (BIOMETRICOS as any)( body );
        await biometricos.save();

        const actividad = 'Se creo registro de biométricos';
        postActividades(body, actividad);

        res.json({
            biometricos
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador del sistema',
            error
        });
    }
};

export const putBiometricos = async( req: Request, res: Response ) => {

    const { CLAVE_LUGAR, ANIO, CONTROL, USUARIO } = req.params;
    const { body } = req;

    try {
        const biometricos = await BIOMETRICOS.findOne({
            where: {
                CLAVE_LUGAR,
                ANIO,
                CONTROL
            }
        });

        if( !biometricos ) {
            return res.status(400).json({
                msg: `No existe información con el CONTROL ${ CONTROL }`
            });
        }

        await biometricos.update( body );

        body.CLAVE_LUGAR = CLAVE_LUGAR;
        body.ANIO = ANIO;
        body.CONTROL = CONTROL;
        body.USUARIO = USUARIO;

        const actividad = 'Se modifico registro de biométricos';
        postActividades(body, actividad);
        
        res.json({
            biometricos 
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador',
            error
        });
    }
};
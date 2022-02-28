import { Request, Response } from 'express';
import DATOS_CITA from '../models/DATOS_CITAS';
import { postActividades } from '../controllers/ACTIVIDADES';

export const getCitas = async( req: Request, res: Response ) => {

    const citas = await DATOS_CITA.findAll();

    res.json({
        citas
    });
};

export const getCita = async( req: Request, res: Response ) => {

    const { CLAVE_LUGAR, ANIO, CONTROL } = req.params;

    const expediente = await DATOS_CITA.findOne({ 
        where: {
            CLAVE_LUGAR,
            ANIO,
            CONTROL
        }
    });

    if ( !expediente ) {
        res.status(404).json({
            msg: `No existe información con el CONTROL ${ CONTROL }`
        });
    }

    res.json({
        expediente
    });
};

export const getExpedienteClaveLugar = async( req: Request, res: Response ) => {

    const { CLAVE_LUGAR } = req.params;

    const expediente = await DATOS_CITA.findAll({ 
        where: {
            CLAVE_LUGAR
        }
    });

    if ( !expediente ) {
        res.status(404).json({
            msg: `No existe información con CLAVE LUGAR ${ CLAVE_LUGAR }`
        });
    }

    res.json({
        expediente
    });
};

const zeroFill = ( number: any, width: any ) => {
    width -= number.toString().length;
    if ( width > 0 )
    {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // siempre devuelve tipo cadena
};

export const postCita = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const year = new Date().getFullYear().toString();
        body.ANIO = year;

        await DATOS_CITA.findOne({
            raw: true,
            where: {
                CLAVE_LUGAR: body.CLAVE_LUGAR,
                ANIO: year,
            }, 
            order: [
                ['CONTROL', 'DESC']
            ]
        }).then(( data: any ) => {

            if ( !data ) {
                const control = 1;
                body.CONTROL = zeroFill( control, 5 );
                return true;
            }

            const control = parseInt(data['CONTROL']) + 1;
            body.CONTROL = zeroFill( control, 5 );
        });

        if ( body.FECHA_CITA ) {
            const fecha_cita = body.FECHA_CITA + ':00';
            body.FECHA_CITA = fecha_cita;
        } else {
            body.FECHA_CITA = null;
        }

        if ( body.FECHA_APERTURA ) {
            const fecha_apertura = body.FECHA_APERTURA + ':00';
            body.FECHA_APERTURA = fecha_apertura;
        } else {
            body.FECHA_APERTURA = null;
        }

        const date = new Date().toISOString();
        body.FCH_REG = date;  
        body.FCH_UAC = date;
        
        const cita = new (DATOS_CITA as any)( body );
        await cita.save();

        const actividad = 'Se creo registro de cita';
        postActividades(body, actividad, '', '');

        res.json({
            cita
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador del sistema',
            error
        });
    }
};

export const putCita = async( req: Request, res: Response ) => {

    const { CLAVE_LUGAR, ANIO, CONTROL, USUARIO } = req.params;
    const { body } = req;

    console.log(body);

    try {
        const cita = await DATOS_CITA.findOne({
            where: {
                CLAVE_LUGAR,
                ANIO,
                CONTROL
            }
        });

        if( !cita ) {
            return res.status(400).json({
                msg: `No existe información con el CONTROL ${ CONTROL }`
            });
        }

        // if ( body.FECHA_CITA ) {
        //     const fecha_cita = body.FECHA_CITA + ':00';
        //     body.FECHA_CITA = fecha_cita;
        // }

        // if ( body.FECHA_APERTURA ) {
        //     const fecha_apertura = body.FECHA_APERTURA + ':00';
        //     body.FECHA_APERTURA = fecha_apertura;
        // }

        await cita.update( body );

        body.CLAVE_LUGAR = CLAVE_LUGAR;
        body.ANIO = ANIO;
        body.CONTROL = CONTROL;
        body.USUARIO = USUARIO;

        const actividad = 'Se modifico registro de cita';
        postActividades(body, actividad);
        
        res.json({
            cita 
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador',
            error
        });
    }
};
import { Request, Response } from 'express';
import ACTIVIDAD from '../models/ACTIVIDADES';

// export const getActividades = async( req: Request, res: Response ) => {

//     const actividades = await ACTIVIDAD.findAll();

//     res.json({
//         actividades
//     });
// };

export const getActividadesId = async( req: Request, res: Response ) => {

    const { CLAVE_LUGAR, ANIO, CONTROL } = req.params;

    const actividades = await ACTIVIDAD.findAll({ 
        where: {
            CLAVE_LUGAR,
            ANIO,
            CONTROL
        }
    });

    if ( !actividades ) {
        res.status(404).json({
            msg: `No existen actividades con el CONTROL ${ CONTROL }`
        });
    }

    res.json({
        actividades
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

export const postActividades = async( body: any, act: string, referencia: string = '', observaciones: string = '' ) => {
    try {
        
        const { CLAVE_LUGAR, ANIO, CONTROL, USUARIO } = body;

        await ACTIVIDAD.findOne({
            raw: true,
            where: {
                CLAVE_LUGAR,
                ANIO,
                CONTROL
            }, 
            order: [
                ['ID', 'DESC']
            ]
        }).then(( data: any ) => {

            if ( !data ) {
                const id = 1;
                body.ID = id;
                return true;
            }

            const id = parseInt(data['ID']) + 1;
            body.ID = id;
        });

        const fecha = new Date();

        const actividades = {
            CLAVE_LUGAR,
            ANIO,
            CONTROL,
            ID: body.ID,
            CLAVE_EMPLEADO: USUARIO,
            FECHA_ACTIVIDAD: fecha,
            ACTIVIDAD: act,
            REFERENCIA: referencia,
            OBSERVACIONES: observaciones,
            USUARIO,
            FCH_REG: fecha,
            FCH_UAC: fecha
        };
        
        const actividad = new (ACTIVIDAD as any)( actividades );
        await actividad.save();

    } catch (error) {
        return error;
    }
};

export const postExpediente = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const year = new Date().getFullYear().toString();
        body.ANIO = year;

        const lastId = await ACTIVIDAD.findOne({
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

        if ( body.FECHA_REGISTRO ) {
            const fecha_registro = body.FECHA_REGISTRO + ':00';
            body.FECHA_REGISTRO = fecha_registro;
        }

        if ( body.FECHA_DENUNCIA ) {
            const fecha_denuncia = body.FECHA_DENUNCIA + ':00';
            body.FECHA_DENUNCIA = fecha_denuncia;
        }
        
        const expediente = new (ACTIVIDAD as any)( body );
        await expediente.save();


        res.json({
            expediente
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador del sistema',
            error
        });
    }
};
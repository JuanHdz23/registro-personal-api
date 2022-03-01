import { Request, Response } from 'express';
import CATALOGO_PUESTOS from '../models/CATALOGO_PUESTOS';

export const getPuestos = async( req: Request, res: Response ) => {

    const { ADSCRIPCION } = req.params;

    const puestos = await CATALOGO_PUESTOS.findAll({ 
        where: {
            ADSCRIPCION
        }
    });

    if ( !puestos ) {
        res.status(404).json({
            msg: `No existe información con ADSCRIPCION ${ ADSCRIPCION }`
        });
    }

    res.json({
        puestos
    });
};
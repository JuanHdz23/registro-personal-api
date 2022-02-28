import { Request, Response } from 'express';
import CATALOGO_ADSCRIPCION from '../models/CATALOGO_ADSCRIPCION';

export const getAdscripciones = async( req: Request, res: Response ) => {

    const adscripciones = await CATALOGO_ADSCRIPCION.findAll({ 
        where: {
            HABILITADO: '1'
        }
    });

    if ( !adscripciones ) {
        res.status(404).json({
            msg: `No existe información de ADSCRIPCIONES`
        });
    }

    res.json({
        adscripciones
    });
};
import { Request, Response } from 'express';
import CATALOGO_TRAMITE from '../models/CATALOGO_TRAMITE';

export const getTramite = async( req: Request, res: Response ) => {

    const tramite = await CATALOGO_TRAMITE.findAll({ 
        where: {
            HABILITADO: '1'
        }
    });

    if ( !tramite ) {
        res.status(404).json({
            msg: `No existe información de TRAMITE`
        });
    }

    res.json({
        tramite
    });
};
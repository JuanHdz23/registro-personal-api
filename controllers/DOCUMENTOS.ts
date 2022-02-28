import { Request, Response } from 'express';
import DOCUMENTOS from '../models/DOCUMENTOS';
import { postActividades } from './ACTIVIDADES';

export const getDocumentosId = async( req: Request, res: Response ) => {

    const { CLAVE_LUGAR, ANIO, CONTROL, TIPO } = req.params;

    const documentos = await DOCUMENTOS.findAll({ 
        where: {
            CLAVE_LUGAR,
            ANIO,
            CONTROL,
            TIPO
        }
    });

    if ( !documentos ) {
        res.status(404).json({
            msg: `No existen documentos con el CONTROL ${ CONTROL } y tipo ${ TIPO }`
        });
    }

    if ( documentos.length > 0 ) {
        for (let i = 0; i < documentos.length; i++) {
            documentos[i].get().DOCUMENTO = documentos[i].get().DOCUMENTO.toString('utf-8');
        }
    }

    res.json({
        documentos
    });
};

export const getDocumentosExisten = async( req: Request, res: Response ) => {
    
    const { CLAVE_LUGAR, ANIO, CONTROL } = req.params;

    const documentos = await DOCUMENTOS.findAll({ 
        where: {
            CLAVE_LUGAR,
            ANIO,
            CONTROL
        }
    });

    const numbers: any[] = [];

    documentos.map( documento => {
        numbers.push( documento.get().TIPO );
    });

    const specimens = numbers.filter((number, i) => i == 0 ? true : numbers[i - 1] != number);
    const tipos = specimens.map(spec => {
        return {number: spec, count: 0};
    });
    
    tipos.map((countSpec, i) =>{
        const actualSpecLength = numbers.filter(number => number === countSpec.number).length;
        countSpec.count = actualSpecLength;
    });

    res.json({
        tipos
    });
};

export const postDocumentos = async( req: Request, res: Response ) => {

    const { body } = req;

    try {

        const date = new Date().toISOString();
        body.FCH_REG = date;  
        body.FCH_UAC = date;
        
        for (let i = 0; i < body.DOCUMENTO.length; i++) {

            const documentoBuffer = Buffer.from( body.DOCUMENTO[i], 'utf-8' );

            const documento = {
                CLAVE_LUGAR: body.CLAVE_LUGAR,
                ANIO: body.ANIO,
                CONTROL: body.CONTROL,
                TIPO: body.TIPO,
                ID: i + 1,
                DOCUMENTO: documentoBuffer,
                OBSERVACIONES: body.OBSERVACIONES,
                USUARIO: body.USUARIO,
                FCH_REG: body.FCH_REG,
                FCH_UAC: body.FCH_UAC,
            };

            const documentos = new (DOCUMENTOS as any)( documento );
            await documentos.save();
        }

        res.status(200).json();

    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador del sistema',
            error
        });
    }
};

export const putDocumentos = async( req: Request, res: Response ) => {

    const { CLAVE_LUGAR, ANIO, CONTROL, TIPO } = req.params;
    const { body } = req;

    try {
        await DOCUMENTOS.destroy({
            where: {
                CLAVE_LUGAR,
                ANIO,
                CONTROL,
                TIPO
            }
        });

        const date = new Date().toISOString();
        body.FCH_REG = date;  
        body.FCH_UAC = date;
        
        for (let i = 0; i < body.DOCUMENTO.length; i++) {

            const documentoBuffer = Buffer.from( body.DOCUMENTO[i], 'utf-8' );

            const documento = {
                CLAVE_LUGAR: body.CLAVE_LUGAR,
                ANIO: body.ANIO,
                CONTROL: body.CONTROL,
                TIPO: body.TIPO,
                ID: i + 1,
                DOCUMENTO: documentoBuffer,
                OBSERVACIONES: body.OBSERVACIONES,
                USUARIO: body.USUARIO,
                FCH_REG: body.FCH_REG,
                FCH_UAC: body.FCH_UAC,
            };

            console.log(documento);
            const documentos = new (DOCUMENTOS as any)( documento );
            await documentos.save();
        }

        res.status(200).json();
        
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador',
            error
        });
    }
};
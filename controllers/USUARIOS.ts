import { Request, Response } from 'express';
import bcrypt  from 'bcrypt';
import USUARIO from '../models/USUARIO';

export const getUsuarios = async( req: Request, res: Response ) => {

    const usuarios = await USUARIO.findAll();

    res.json({
        usuarios
    });
};

export const getUsuario = async( req: Request, res: Response ) => {

    const { CONTROL } = req.params;

    const usuario = await USUARIO.findByPk( CONTROL );

    if ( !usuario ) {
        res.status(404).json({
            msg: `No existe un usuario con el CONTROL ${ CONTROL }`
        });
    }

    res.json({
        usuario
    });
};

export const postUsuario = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const existeUsuario = await USUARIO.findOne({
            where: {
                USUARIO: body.USUARIO
            }
        });

        if ( existeUsuario ) {
            return res.status(400).json({
                msg: `El usuario ${ body.USUARIO } ya se encuentra registrado.`
            });
        }
        
        const lastId = await USUARIO.findOne({
            raw: true, 
            order: [
                ['CONTROL', 'DESC']
            ]
        }).then(( data: any ) => {

            if ( !data ) {
                const control = 1;
                body.CONTROL = control;
                return true;
            }

            const control = parseInt(data['CONTROL']) + 1;
            body.CONTROL = control;
        });

        const salt = await bcrypt.genSaltSync(10);
        const buffSalt = new Buffer( salt );
        body.SALT = buffSalt;
        
        const password = await bcrypt.hashSync( body.PASSWORD, salt );
        const buffPassword = new Buffer( password );
        body.PASSWORD = buffPassword;

        const usuario = new (USUARIO as any)( body );
        await usuario.save();

        res.json({
            usuario
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador',
            error
        });
    }
};

export const putUsuario = async( req: Request, res: Response ) => {

    const { CONTROL } = req.params;
    const { body } = req;

    try {
        const usuario = await USUARIO.findByPk( CONTROL );

        if( !usuario ) {
            return res.status(400).json({
                msg: `No existe un usuario con el CONTROL ${ CONTROL }`
            });
        }

        const salt = await bcrypt.genSaltSync(10);
        const buffSalt = new Buffer( salt );
        body.SALT = buffSalt;
        
        const password = await bcrypt.hashSync( body.PASSWORD, salt );
        const buffPassword = new Buffer( password );
        body.PASSWORD = buffPassword;

        await usuario.update( body );
        
        res.json({
            usuario
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador',
            error
        });
    }
};

export const deleteUsuario = async( req: Request, res: Response ) => {

    const { CONTROL } = req.params;

    const usuario = await USUARIO.findByPk( CONTROL );

    if( !usuario ) {
        return res.status(400).json({
            msg: `No existe un usuario con el CONTROL ${ CONTROL }`
        });
    }

    await usuario.update({ ACTIVO: false });

    res.json({
        usuario
    });
};
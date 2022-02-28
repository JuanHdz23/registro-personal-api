import { Request, Response } from 'express';
import bcrypt  from 'bcrypt';
import USUARIO from '../models/USUARIO';
import { generarJWT } from '../helpers/generar-jwt';

export const login = async( req: Request, res: Response ) => {

    const { USER, PASSWORD } = req.body;

    try {

        const usuario = await USUARIO.findOne({
            where: {
                USUARIO: USER
            }
        });

        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        if ( !usuario.get('ACTIVO') ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: inactivo'
            });
        }

        const password: any = usuario.get('PASSWORD');
        const buffPassword = new Buffer( password, 'base64' );
        const pass = buffPassword.toString('ascii');
        const validarPassword = bcrypt.compareSync( PASSWORD, pass );

        if ( !validarPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Generar JWT
        const control: any = usuario.get('CONTROL');
        const nombre: any = usuario.get('NOMBRE');
        const paterno: any = usuario.get('PATERNO');
        const clave_lugar: any = usuario.get('CLAVE_LUGAR');
        const rol: any = usuario.get('ROL');
        const clave_empleado: any = usuario.get('CLAVE_EMPLEADO');

        const token = await generarJWT( control, nombre, paterno, clave_lugar, rol, clave_empleado );

        res.json({
            token
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador',
            error
        });
    }
};
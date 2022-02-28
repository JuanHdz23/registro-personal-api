import jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generarJWT = ( CONTROL = '', NOMBRE = '', PATERNO = '', CLAVE_LUGAR = '', ROL = '', CLAVE_EMPLEADO = '' ) => {
    return new Promise( ( resolve, reject ) => {
        const payload = { CONTROL, NOMBRE, PATERNO, CLAVE_LUGAR, ROL, CLAVE_EMPLEADO };
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY || '', {
            expiresIn: '2h'
        }, ( err, token ) => {
            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el JWT' );
            } else {
                resolve( token );
            }
        });
    })
};
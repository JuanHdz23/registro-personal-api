import jwt  from 'jsonwebtoken';

const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json'));

export const generarJWT = ( CONTROL = '', NOMBRE = '', PATERNO = '', CLAVE_LUGAR = '', ROL = '', CLAVE_EMPLEADO = '' ) => {
    return new Promise( ( resolve, reject ) => {
        const payload = { CONTROL, NOMBRE, PATERNO, CLAVE_LUGAR, ROL, CLAVE_EMPLEADO };
        jwt.sign( payload, config.SECRETORPRIVATEKEY || '', {
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
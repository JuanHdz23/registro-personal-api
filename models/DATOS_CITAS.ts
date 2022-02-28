import { DataType, DataTypes } from 'sequelize';
import db from '../db/connection';

const DATOS_CITA = db.define('DATOS_CITA', {
    CLAVE_LUGAR : {
        type: DataTypes.CHAR,
        primaryKey: true,
        allowNull: false,
    },
	ANIO : {
        type: DataTypes.CHAR,
        primaryKey: true,
        allowNull: false,
    },
	CONTROL : {
        type: DataTypes.CHAR,
        primaryKey: true,
        allowNull: false,
    },
	PATERNO : {
        type: DataTypes.STRING
    },
	MATERNO : {
        type: DataTypes.STRING
    },
	NOMBRE : {
        type: DataTypes.STRING,
        allowNull: false
    },
    SEXO : {
        type: DataTypes.STRING,
    },
    NO_EMPLEADO : {
        type: DataTypes.STRING,
    },
	PUESTO : {
        type: DataTypes.STRING,
    },
	TRAMITE : {
        type: DataTypes.STRING
    },
	AREA_ADSCRIPCION : {
        type: DataTypes.STRING
    },
	CELULAR : {
        type: DataTypes.STRING
    },
	CORREO : {
        type: DataTypes.STRING
    },
	VIGENCIA_C3 : {
        type: DataTypes.STRING
    },
	OFICIO_C3 : {
        type: DataTypes.STRING
    },
	FECHA_APERTURA : {
        type: DataTypes.DATE
    },
	FECHA_CITA : {
        type: DataTypes.DATE
    },
	OBSERVACIONES : {
        type: DataTypes.STRING
    },
	USUARIO : {
        type: DataTypes.STRING
    },
	FCH_REG : {
        type: DataTypes.DATE
    },
    FCH_UAC : {
        type: DataTypes.DATE
    }
},{
	tableName: 'DATOS_CITA',
	timestamps: false,
	freezeTableName: true
});

export default DATOS_CITA;
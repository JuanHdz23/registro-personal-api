import { DataType, DataTypes } from 'sequelize';
import db from '../db/connection';

const ARCHIVO = db.define('ARCHIVO', {
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
    DESCRIPCION : {
        type: DataTypes.STRING
    },
	FECHA_CIERRE : {
        type: DataTypes.STRING
    },
    UBICACION : {
        type: DataTypes.STRING
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
	tableName: 'ARCHIVO',
	timestamps: false,
	freezeTableName: true
});

export default ARCHIVO;
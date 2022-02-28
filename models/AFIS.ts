import { DataType, DataTypes } from 'sequelize';
import db from '../db/connection';

const AFIS = db.define('AFIS', {
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
	FECHA_ENTRADA : {
        type: DataTypes.STRING
    },
	FECHA_SALIDA : {
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
	tableName: 'AFIS',
	timestamps: false,
	freezeTableName: true
});

export default AFIS;
import { DataType, DataTypes } from 'sequelize';
import db from '../db/connection';

const RNPSP = db.define('RNPSP', {
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
	CUIP : {
        type: DataTypes.STRING
    },
	FECHA_CREACION_CUIP : {
        type: DataTypes.STRING
    },
    FECHA_ENTREGA_CUIP : {
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
	tableName: 'RNPSP',
	timestamps: false,
	freezeTableName: true
});

export default RNPSP;
import { DataType, DataTypes } from 'sequelize';
import db from '../db/connection';

const DOCUMENTOS = db.define('DOCUMENTOS', {
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
    TIPO : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    ID : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
	DOCUMENTO : {
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
    tableName: 'DOCUMENTOS',
	timestamps: false,
	freezeTableName: true
});

export default DOCUMENTOS;
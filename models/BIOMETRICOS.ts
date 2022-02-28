import { DataType, DataTypes } from 'sequelize';
import db from '../db/connection';

const BIOMETRICOS = db.define('BIOMETRICOS', {
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
	RECIP : {
        type: DataTypes.STRING
    },
	DOCS_RECIP : {
        type: DataTypes.STRING
    },
    HUELLAS : {
        type: DataTypes.STRING
    },
    CUIP : {
        type: DataTypes.STRING
    },
    CIB_RECIP : {
        type: DataTypes.STRING
    },
    RNPSP : {
        type: DataTypes.STRING
    },
    DOCS_RNPSP : {
        type: DataTypes.STRING
    },
    CIB_RNPSP : {
        type: DataTypes.STRING
    },
    NO_CIB : {
        type: DataTypes.STRING
    },
    FOTOS : {
        type: DataTypes.STRING
    },
    CARGO_FOTOS : {
        type: DataTypes.STRING
    },
    FICHA_HUELLAS : {
        type: DataTypes.STRING
    },
    VOZ : {
        type: DataTypes.STRING
    },
    LIGA_FACIAL : {
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
	tableName: 'BIOMETRICOS',
	timestamps: false,
	freezeTableName: true
});

export default BIOMETRICOS;
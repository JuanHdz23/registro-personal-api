import { DataType, DataTypes } from 'sequelize';
import db from '../db/connection';

const ACTIVIDAD = db.define('ACTIVIDAD', {
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
    ID : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
	CLAVE_EMPLEADO : {
        type: DataTypes.STRING
    },
	FECHA_ACTIVIDAD : {
        type: DataTypes.DATE
    },
	ACTIVIDAD : {
        type: DataTypes.STRING
    },
	REFERENCIA : {
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
	tableName: 'ACTIVIDAD',
	timestamps: false,
	freezeTableName: true
});

export default ACTIVIDAD;
import { DataType, DataTypes } from 'sequelize';
import db from '../db/connection';

const USUARIO = db.define('USUARIOS', {
    CONTROL: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    NOMBRE: {
        type: DataTypes.STRING,
        allowNull: false
    },
    PATERNO: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MATERNO: {
        type: DataTypes.STRING
    },
    USUARIO: {
        type: DataTypes.STRING,
        allowNull: false
    },
    PASSWORD: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CLAVE_EMPLEADO: {
        type: DataTypes.INTEGER
    },
    CLAVE_LUGAR: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ACTIVO: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    ROL: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    SALT: {
        type: DataTypes.STRING,
        allowNull: false
    },
    USUARIO_REG: {
        type: DataTypes.STRING
    },
    USUARIO_UAC: {
        type: DataTypes.STRING
    },
    FCH_REG: {
        type: DataTypes.DATE
    },
    FCH_UAC: {
        type: DataTypes.DATE
    },
},{
	tableName: 'USUARIOS',
	timestamps: false,
	freezeTableName: true
});

export default USUARIO;
import { DataType, DataTypes } from 'sequelize';
import db from '../db/connection';

const CATALOGO_PUESTOS = db.define('CATALOGO_PUESTOS', {
	ID : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
	ADSCRIPCION : {
        type: DataTypes.STRING,
        allowNull: false
    },
	PUESTO : {
        type: DataTypes.STRING,
        allowNull: false
    },
    HABILITADO : {
        type: DataTypes.CHAR,
    }
},{
	tableName: 'CATALOGO_PUESTOS',
	timestamps: false,
	freezeTableName: true
});

export default CATALOGO_PUESTOS;
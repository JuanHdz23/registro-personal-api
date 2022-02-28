import { DataType, DataTypes } from 'sequelize';
import db from '../db/connection';

const CATALOGO_ADSCRIPCION = db.define('CATALOGO_ADSCRIPCION', {
	ID : {
        type: DataTypes.INTEGER
    },
	ADSCRIPCION : {
        type: DataTypes.STRING
    },
    HABILITADO : {
        type: DataTypes.CHAR,
    }
},{
	tableName: 'CATALOGO_ADSCRIPCION',
	timestamps: false,
	freezeTableName: true
});

export default CATALOGO_ADSCRIPCION;
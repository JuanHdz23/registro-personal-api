import { DataType, DataTypes } from 'sequelize';
import db from '../db/connection';

const CATALOGO_TRAMITE = db.define('CATALOGO_TRAMITE', {
	ID : {
        type: DataTypes.INTEGER
    },
	TRAMITE : {
        type: DataTypes.STRING
    },
    HABILITADO : {
        type: DataTypes.CHAR,
    }
},{
	tableName: 'CATALOGO_TRAMITE',
	timestamps: false,
	freezeTableName: true
});

export default CATALOGO_TRAMITE;
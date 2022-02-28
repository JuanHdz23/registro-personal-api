"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const BIOMETRICOS = connection_1.default.define('BIOMETRICOS', {
    CLAVE_LUGAR: {
        type: sequelize_1.DataTypes.CHAR,
        primaryKey: true,
        allowNull: false,
    },
    ANIO: {
        type: sequelize_1.DataTypes.CHAR,
        primaryKey: true,
        allowNull: false,
    },
    CONTROL: {
        type: sequelize_1.DataTypes.CHAR,
        primaryKey: true,
        allowNull: false,
    },
    RECIP: {
        type: sequelize_1.DataTypes.STRING
    },
    DOCS_RECIP: {
        type: sequelize_1.DataTypes.STRING
    },
    HUELLAS: {
        type: sequelize_1.DataTypes.STRING
    },
    CUIP: {
        type: sequelize_1.DataTypes.STRING
    },
    CIB_RECIP: {
        type: sequelize_1.DataTypes.STRING
    },
    RNPSP: {
        type: sequelize_1.DataTypes.STRING
    },
    DOCS_RNPSP: {
        type: sequelize_1.DataTypes.STRING
    },
    CIB_RNPSP: {
        type: sequelize_1.DataTypes.STRING
    },
    NO_CIB: {
        type: sequelize_1.DataTypes.STRING
    },
    FOTOS: {
        type: sequelize_1.DataTypes.STRING
    },
    CARGO_FOTOS: {
        type: sequelize_1.DataTypes.STRING
    },
    FICHA_HUELLAS: {
        type: sequelize_1.DataTypes.STRING
    },
    VOZ: {
        type: sequelize_1.DataTypes.STRING
    },
    LIGA_FACIAL: {
        type: sequelize_1.DataTypes.STRING
    },
    OBSERVACIONES: {
        type: sequelize_1.DataTypes.STRING
    },
    USUARIO: {
        type: sequelize_1.DataTypes.STRING
    },
    FCH_REG: {
        type: sequelize_1.DataTypes.DATE
    },
    FCH_UAC: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    tableName: 'BIOMETRICOS',
    timestamps: false,
    freezeTableName: true
});
exports.default = BIOMETRICOS;
//# sourceMappingURL=BIOMETRICOS.js.map
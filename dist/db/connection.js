"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const db = new Sequelize(process.env.DB || '', process.env.USERDB || '', process.env.PASSDB, {
//     dialect: 'mssql',
//     host: process.env.HOST
// });
// DB PRUEBAS
const db = new sequelize_1.Sequelize('VAR', 'varSist', 'a123', {
    dialect: 'mssql',
    host: '192.168.182.1'
});
// DB PRODUCCIÓN
// const db = new Sequelize('RNPSP', 'rnpsp_sist', 'abc.123', {
//     host: '10.4.3.219',
//     dialect:'mssql',
//     dialectOptions: {
//             options: {
//                 encrypt: false
//             }
//         }
//   });
exports.default = db;
//# sourceMappingURL=connection.js.map
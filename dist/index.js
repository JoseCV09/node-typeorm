"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const Usuario_routes_1 = __importDefault(require("./Routes/Usuario.routes"));
const app = express_1.default();
// Conexion typeORM
typeorm_1.createConnection();
// middlewares
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
// routes
app.use('/api/usuarios', Usuario_routes_1.default);
app.listen(3000);
console.log('Server on port: ', 3000);

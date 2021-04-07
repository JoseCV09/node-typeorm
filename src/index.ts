import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';
import 'reflect-metadata'

import usuarioRoutes from './Routes/Usuario.routes';

const app = express();

// Conexion typeORM
createConnection();

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api/usuarios', usuarioRoutes)

app.listen(3000);

console.log('Server on port: ', 3000);

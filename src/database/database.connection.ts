import 'reflect-metadata'; 
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { join } from 'path'; 
const parentDir = join(__dirname, '..'); 
const connectionOpts: ConnectionOptions = 
    { type: 'mysql', 
    host: process.env.DB_HOST || 'remotemysql.com',
    port: Number(process.env.DB_PORT) || 3306, 
    username: process.env.DB_USERNAME || 'KUAJoGg7aM', 
    password: process.env.DB_PASSWORD || 'n1rEEjCJT5', 
    database: process.env.DB_NAME || 'KUAJoGg7aM',
     entities: [ `${parentDir}/**/*.entity.ts`, ], synchronize: true, }; 
const connection:Promise<Connection> = createConnection(connectionOpts);
export default connection;
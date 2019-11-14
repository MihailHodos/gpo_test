import 'reflect-metadata'; 
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { join } from 'path'; 
const parentDir = join(__dirname, '..'); 
const connectionOpts: ConnectionOptions = 
    { type: 'mysql', 
    host: process.env.DB_HOST || 'onnjomlc4vqc55fw.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',//'remotemysql.com',
    port: Number(process.env.DB_PORT) || 3306, 
    username: process.env.DB_USERNAME || 'nuwdr8p2h38mnkwz',// 'KkhPfpF9N4', 
    password: process.env.DB_PASSWORD || 'fbygwvisf9175ap0',//'cPKDwB1HJb', 
    database: process.env.DB_NAME || 'om0fw3k4pksnn7oq',//'KkhPfpF9N4',
     entities: [ `${parentDir}/**/*.entity.*s`, ], synchronize: true, }; 
const connection:Promise<Connection> = createConnection(connectionOpts);
export default connection;
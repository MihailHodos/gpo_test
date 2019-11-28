import * as Koa from 'koa'; 
import * as HttpStatus from 'http-status-codes';
import * as bodyParser from 'koa-bodyparser';
import movieController from '../movie/movie.controller';
import userController from '../user/user.controller';

 const app:Koa = new Koa(); 
 const cors = require('@koa/cors');
 app.use(cors());

 app.use(bodyParser());
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => { 
    try { await next(); } 
    catch (error) { 
        ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR; error.status = ctx.status;
        ctx.body = { error };
        ctx.app.emit('error11', error, ctx);
} }); 

app.use(movieController.routes());
app.use(movieController.allowedMethods());

app.use(userController.routes());
app.use(userController.allowedMethods());

app.on('error!', console.error); 

export default app;

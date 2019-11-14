import * as Koa from 'koa'; 
import { getRepository, Repository } from 'typeorm';
const nodemailer = require('nodemailer');
import * as Router from 'koa-router'; 
import * as HttpStatus from 'http-status-codes'; 
import userEntity from './user.entity';
var jwt = require('jsonwebtoken');
const routerOpts: Router.IRouterOptions = { prefix: '/user', };
const router: Router = new Router(routerOpts); 
router.get('/', async (ctx:Koa.Context) => {
  ctx.body = 'server is running';
});
router.get('/verify/:email', async (ctx:Koa.Context) => {

    const userRepo:Repository<userEntity> = getRepository(userEntity);
    const user:userEntity =  await userRepo.findOne({ email: ctx.params.email });
    if(user){
        user.verification = true;
    }
    await userRepo.save(user);

    ctx.body = "<p style='color:green;'>Ваш аккаунт подтвержден</p>";
    });

        router.get('/:user_id', async (ctx:Koa.Context) => {
   
    });

//auth
router.post('/auth', async (ctx:Koa.Context) => {
  let res = null;
  const userRepo:Repository<userEntity> = getRepository(userEntity); 
  
  const user:userEntity = ctx.request.body;
  if(user){
    res = await userRepo.findOne({email: user.email, password: user.password});
  }
  if(res){
    var token = jwt.sign({id: user.id}, 'shhhhh');
    ctx.status = 200;
    ctx.body = { data: { token},success: true };
  }else {
    ctx.body = {success: false};
  }


});
//Регистрация
router.post('/', async (ctx:Koa.Context) => {
     
    const userRepo:Repository<userEntity> = getRepository(userEntity); 

    const user:userEntity = ctx.request.body;

    await userRepo.save(user);

    let host = ctx.request.host; 
    let rand=Math.floor((Math.random() * 100) + 54);
    let link="http://" + host + "/user/verify/" + user.email;//rand;
    let smtpTransport;

    try {
      smtpTransport = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 587,
        secure: false, // true for 465, false for other ports 587
        auth: {
          user: "ham252@mail.ru",
          pass: "left_80906"
        }
      });
    } catch (e) {
      return console.log('Error: ' + e.name + ":" + e.message);
    }
  
    let mailOptions = {
      from: 'ham252@mail.ru', 
      to: user.email, 
      subject: "Подтверждение", 
      text: link, 
     // html: '<b>Hello world?</b>' 
    };
  
    smtpTransport.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        return console.log(error);
      } else {
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      }
      ctx.body = 'почта отправлена';
 
 });
    var token = jwt.sign(user, 'shhhhh');
    ctx.status = HttpStatus.CREATED;
    ctx.body = { data: { token}, };
}); 
router.delete('/:user_id', async (ctx:Koa.Context) => { ctx.body = ctx.request.host; }); 
router.patch('/:user_id', async (ctx:Koa.Context) => { ctx.body = 'PATCH'; }); 
export default router;
index.get("test", async ctx => {
	const user = {id:3 , email: 'mhodos@ya.ru'};
	var token = jwt.sign(user, 'shhhhh');
	ctx.res.end(token);
});

index.post("test", async ctx => {
	const user = {id:3 , email: 'mhodos@ya.ru'};
	var token = ctx.request.body.token;
	var resul = jwt.verify(token, 'shhhhh');
	if(resul && resul.email === user.email){
		ctx.response.body = "Авторизация прошла успешно";
	}else{
		ctx.response.body = "failed";
	}
	
});
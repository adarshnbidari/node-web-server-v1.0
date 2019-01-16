const express=require('express');

const hbs=require('hbs'); 

const fs=require('fs'); 

const port=process.env.PORT || 3000;
 
var app=express();

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});


hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});

app.set('view engine','hbs');



/* app.use((req,res,next)=>{
	res.render('maintenance.hbs');
}); */

app.use(express.static(__dirname));

app.use((req,res,next)=>{
	var now=new Date().toString();
	var log=`${now}: ${req.method} ${req.url}`;
	
	fs.appendFile('server.log',log+'\n',(err)=>{
		if(err){
		console.log('unable to process logs!...');
		}
	});
	
	next();
});

app.get('/',(req,res)=>{
	res.render('home.hbs',{
		pageTitle:"welcome page",
		message:"screaming"
		});
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle:"this is techslaim"
	});
});

app.get('/bad',(req,res)=>{
	res.send({
		errorCode:403,
		status:"badRequest"
	});
});

app.listen(port,()=>{
	console.log(`server is running in port ${port}`);
});
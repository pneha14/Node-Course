const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
    var now=new Date().toString();
    var logg=`${now}: ${req.method} ${req.url}`;
    console.log(logg);
    fs.appendFile('server.log',logg+'\n',(err)=>{
        if(err) throw err;
        console.log('Successfully append to server.log');
              
    });
    next();
});

//app.use((req,res,next)=>{
  //  res.render('maintenance.hbs');

//});
app.use(express.static(__dirname + '/public'));



hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()

});

hbs.registerHelper('screamIt' ,(text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
    //res.send('<h1>Hello Express!</h1>');
    res.send({
        name:'Neha',
        likes:[
            'Reading',
            'Cooking',
            'Travelling'
        ]

    });
});

app.get('/home',(req,res)=>{
    //res.send('About Page')
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage:'Welcome to page' 

    });
    
});


app.get('/about',(req,res)=>{
    //res.send('About Page')
    res.render('about.hbs',{
        pageTitle:'About Page',
        welcomeMessage:"Welcome to my page"
    });
    
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Unable to handle request'

    });

});

app.listen(3000,()=>{
    console.log('Server is up at port 3000');
});
const express  = require('express');
var app = express();
var fs = require('fs');
const covid = require('novelcovid');
const axios = require('axios');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
//fetch data

//setup view engine
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(express.static(__dirname+'/public'));
//setup bodyparser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.get('/',(req,res)=>{
	axios.get('https://corona.lmao.ninja/countries/pakistan')
  .then(function (response) {
    res.render('index',{
    	data:response.data
    })
  })
  .catch(function (error) {
    console.log(error);
  });
});
app.get('/world', (req, res) => {
	res.render('global');
});
app.get('/prevent',(req,res)=>{
	res.render('fatal');
});
app.get('/about',(req,res)=>{
	res.render('about');
});

//post request
app.post('/world',(req,res)=>{
	let country = req.body.search;
	axios.get(`https://corona.lmao.ninja/countries/${country}`)
  .then(function (response) {
  	
    res.render('global',{
    	data:response.data
    })
  })
  .catch(function (error) {
    console.log(error);
  });
});





app.listen(process.env.PORT || 5000);
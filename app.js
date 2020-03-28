const express  = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
const covid = require('novelcovid');
const axios = require('axios');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var cors = require('cors');
//setup view engine
app.use(cors());
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname,"public")));
//setup bodyparser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
//downtime index route


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
    res.send('<h1 style="font-size:700%;">Working on an update!!! will be back soon! 🤗</h1><br><p>Meanwhile <a href="https://bit.ly/2JhB4kG">Follow</a> me for updates</p> ')
  });
});


//routes to render pages
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
console.log(response.data)
    res.render('global',{
    	data:response.data
    })
  })
  .catch(function (error) {
    console.log(error);
  });
});

//worldide route
app.get('/worldwide',(req,res)=>{
	axios.get('https://corona.lmao.ninja/all')
  .then(function (response) {
    res.render('total',{
    	data:response.data
    })
  })
  .catch(function (error) {
    console.log(error);
  });
});





app.listen(process.env.PORT || 5000);

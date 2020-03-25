const express  = require('express');
var app = express();
var fs = require('fs')

app.use(express.static(__dirname+'/public/condition'));
app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>{res.render('index')});
app.get('/condition', (req, res) => {
    fs.readFile(__dirname + '/public/condition.html', 'utf8', (err, text) => {
        res.send(text);
    });
});

app.listen(process.env.PORT || 5000);
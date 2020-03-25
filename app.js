const express  = require('express');
var app = express();

app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>{res.render('index')});
var port = process.env.PORT || 3000;
app.listen(3000,()=>{ console.log(`app runing on ${port}`)})
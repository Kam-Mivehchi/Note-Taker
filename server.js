var express = require("express");
const htmlRoutes = require('./routes/htmlRoutes.js');
const apiRoutes = require('./routes/apiRoutes.js');

//initializes the express applicaation on port 3000or process.env.port for heroku
var app = express();
var PORT = process.env.PORT || 3000;

//loads the entire public folder
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
//body parsing middle ware
app.use(express.json());

//middle ware for route scripts
app.use('/api',apiRoutes);
app.use('/', htmlRoutes);



app.listen(PORT,function(){
    console.log("App listening on PORT:" + PORT);
});
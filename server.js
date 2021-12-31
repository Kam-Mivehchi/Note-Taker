var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/notes', (req,res)=>{
    res.sendFile("./public/notes.html");
});

app.listen(PORT,function(){
    console.log("App listening on PORT:" + PORT);
});
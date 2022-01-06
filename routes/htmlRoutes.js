var path = require('path');
const router = require('express').Router();


//links the front end html to the endpoing /notes
    router.get('/notes', function(req,res){
        res.sendFile(path.join(__dirname, '../public/notes.html'));

    });
// will serve the index.html landing page upon launch, root route
    router.get('*', function(req,res){
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    module.exports= router;
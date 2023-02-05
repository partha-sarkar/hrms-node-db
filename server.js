require('./db-config');

const express = require('express');
const bodyparser = require('body-parser');
const root_router = require('./router');

const PORT = (process.env.PORT!='')? process.env.PORT : 3100;
const cors = require('cors');

var app = express();

app.use(cors({
    origin: '*'
}));

//use middleware
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

//use router
app.use(root_router);


//app listning port
app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Express start at PORT: ' + PORT);
    }

});


const express = require('express');
const router = express.Router();
const authMiddleware = require('./middleware/auth.middleware');

//call controllers
const users = require('./controller/users.controller');


router.get('/',(req,res)=>{
    res.send('hello-1');
    console.log('root');
});



router.post('/login',async (req,res)=>{
    try{
    const tempObjUser = await users.loginSubmit(req.body);
    let ObjUser = JSON.parse(tempObjUser);
    res.setHeader('Content-Type', 'application/json');
    res.status(ObjUser.status);
    res.send(ObjUser); 

    }catch (err) {
        console.log(err);
    }
    

});


module.exports = router;

const { json } = require('express');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send(
               JSON.stringify({status:403,message:"A token is required for authentication" })
            );
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        decoded.status=200;
       // res.status(200).send(JSON.stringify(decoded));

    } catch (err) {
        return res.status(401).send(
            JSON.stringify({status:401,message:"A token is required for authentication" })
        );
    }
      return next();
};

module.exports = verifyToken;
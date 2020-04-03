const jwt = require ('jsonwebtoken'); 
const secret = 'mysecret'; 

const middlewares = {};

middlewares.withAuth =(req, res, next) => { 
  var token = req.body['x-access-token'] || req.query['x-access-token'] || req.headers['x-access-token'];
  if (! token) { 
    res.status(401).json({message: 'No autorizado'}); 
  } else { 
    jwt.verify (token, secret, (err, decoded) => { 
      if (err) { 
        res.status(401).json({message: 'No autorizado'});  
      } else { 
        req.username = decoded.username; 
        next (); 
      } 
    }); 
  } 
} 

module.exports = middlewares;
const jwt = require ('jsonwebtoken'); 
const secret = 'mysecret'; 

const middlewares = {};

middlewares.withAuth =(req, res, next) => { 
  var token = req.body['access-token'] || req.query['access-token'] || req.headers['access-token'];
  if (! token) { 
    res.status(401).json({message: 'No autorizado'}); 
  } else { 
    jwt.verify (token, secret, (err, decoded) => { 
      if (err) { 
        res.status(401).json({message: 'No autorizado'});  
      } else { 
        req.user = decoded.id; 
        next(); 
      } 
    }); 
  } 
} 

module.exports = middlewares;
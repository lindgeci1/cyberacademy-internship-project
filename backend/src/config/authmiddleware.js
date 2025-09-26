const jwt = require('jsonwebtoken');

function authenticate(req, res, next){

    const autheader = req.headers["authorization"];

    if(!autheader || !autheader.startsWith("Bearer ")){
        return res.status(401).json({message: "Authentication token is missing!"});
    }

    const token = autheader.substring("Bearer ".length).trim();

    const SECRET = process.env.JWT_SECRET;

    try{
        jwt.verify(token, SECRET, {clockTolerance: 0});
        
    }
    catch(error){
        if(error.name==="TokenExpiredError"){
            return res.status(401).json({message: "Authenticate token has expired!"});
        }
            return res.status(401).json({message: "Invalid authentication token!"});
    }

    next();
}

module.exports = authenticate;
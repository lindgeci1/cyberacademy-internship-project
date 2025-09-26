const jwt = require('jsonwebtoken');
const {fakeusers} = require('../config/DummyUsers');


const login = (req, res)=>{
    const SECRET = process.env.JWT_SECRET;
    const {username, password} = req.body || {};
        if(!SECRET){
        return res.status(404).json({message: "Secret not found"});
    }
    if(!username || !password){
        return res.status(404).json({message: "Username and password required!"});
    }
    const user = fakeusers.find(u=>u.username===username && u.password===password);

    const token = jwt.sign({username: user.username}, SECRET, {expiresIn: "15m"});

    res.json({token});
};

module.exports = {login};
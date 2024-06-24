const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authenticate = (req, res, next) => {
   try { 

    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    console.log("llll", process.env.JWT_SECRET);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    console.log('Decoded:', decoded);
    console.log(decoded,"wfjnwef");
    req.user = decoded;
    next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

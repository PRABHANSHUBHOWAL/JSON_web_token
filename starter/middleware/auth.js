const jwt = require('jsonwebtoken');

const {UnauthenticatedError} = require('../errors');


const authMiddleware = async (req, res, next) => {
    // console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('No Token provided');
    }
    const token = authHeader.split(' ')[1];
    // console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        const {id,username} = decoded;
        req.user={id,username};
        next();
    } catch (error) {
        throw new UnauthenticatedError('Not authorised to access this route');
    }
    
}
module.exports = authMiddleware;
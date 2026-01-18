import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const protect = async ( req, res, next ) => {

    let token;

    // Check if token exists in Authorization Header
    if (typeof req.headers.authorization === 'string' && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Not Authorized. No Token',
            statusCode: 401
        });
    }

    try {
        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'User not Found',
                statusCode: 401
            });
        }

        next();
    } catch (error) {
        console.log('Auth middleware error:', error.message);

        if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError' || error.name === 'NotBeforeError') {
            return res.status(401).json({
                success: false,
                error: 'Not authorized. Token failed.',
                statusCode: 401
            });
        } else {
            // For any other error, return 500 or call next(err)
            return res.status(500).json({
                success: false,
                error: 'Internal Server Error',
                statusCode: 500
            });
        }
    }

}


export default protect;




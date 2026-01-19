import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const protect = async ( req, res, next ) => {

    // Check if token exists in Authorization Header
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
        return res.status(401).json({
            success: false,
            error: 'Not authorized. No token provided',
            statusCode: 401
        });
    }

    try {

        let token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Not Authorized. No Token',
                statusCode: 401
            });
        }


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

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: 'Token has Expired.',
                statusCode: 401
            });
        }

        return res.status(401).json({
            success: false,
            error: 'Not authorized, Token failed',
            statusCode: 401
        });
    }

}

export default protect;




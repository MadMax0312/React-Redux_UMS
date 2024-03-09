import jwt from 'jsonwebtoken'; // To protect routes that require authentication
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'

// it checks for a valid JWT (JSON Web Token) in the request cookies and verifies it using the jsonwebtoken library.
 //If the token is valid, it decodes the token to extract the user ID and then fetches the user from the database 
 //using User.findById(decoded.userId). The user object is then attached to the request (req.user) for use in 
 //subsequent middleware or route handlers.

const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if(token) {

        try {

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            req.user = await User.findById(decoded.userId).select('-password')

            next()

        } catch(error) {
            res.status(401)
            throw new Error('Not Authorized. Invalid token')
        }

    } else {
        res.status(401);
        throw new Error('Not authorized, no token')
    }
})

export { protect }
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generteToken.js'
import Admin from '../models/adminModel.js';
import User from '../models/userModel.js';

const authAdmin = asyncHandler( async(req, res) => {

    const { email, password} = req.body
    console.log(req.body)
    const admin = await Admin.findOne({ email })

    if(admin && await admin.matchPassword(password) && admin.isAdmin===true ) {
        generateToken(res, admin._id)
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }

})

const logoutAdmin = asyncHandler(async (req, res) => {

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    console.log('admin logged Out')
    res.status(200).json({ message: 'Admin Logged Out' })
})

const getUserData = asyncHandler(async (req, res) => {
    const users = await User.find()
    console.log(users)
    res.status(200).json(users)
})

export {
    authAdmin,
    logoutAdmin,
    getUserData,
}
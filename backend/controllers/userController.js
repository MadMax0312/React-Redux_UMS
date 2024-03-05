import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// Auth User and set Token.
// route POST /api/users/auth
//access Public

const authUser = asyncHandler( async(req, res) => {
    
    res.status(200).json({ message: 'Auth User' })
})

// Register a new User
// route POST /api/users/
//access Public

const registerUser = asyncHandler(async (req, res) => {

    console.log(req.body)
    res.status(200).json({ message: 'Register User' })
})

const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'User Logged Out' })
})

// Get User Profile
// route POST /api/users/profile
//access Private

const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'User Profile' })
})

// Update User Profile
// route PUT /api/users/profile
//access Private

const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Update user Profile' })
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
}
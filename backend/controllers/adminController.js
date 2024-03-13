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
    res.status(200).json(users)
})

const getUsersProfile = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) { 
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
});

const editUserData = asyncHandler(async (req, res) => {

    console.log('fjdljfkdsjfldslf')

    console.log("dfjdlkf", req.body)

    const id = req.params.id;
    const user = await User.findById(id);

    console.log(user)

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    } 

    user.name = req.body.name || user.name;

    if (req.body.password) {
        user.password = req.body.password;
    }

    const updatedUser = await user.save();

    console.log(updatedUser)

    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
    });
});

const deleteUserData = asyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
});

export {
    authAdmin,
    logoutAdmin,
    getUserData,
    editUserData,
    getUsersProfile,
    deleteUserData
}
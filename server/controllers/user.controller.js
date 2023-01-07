const RNuser = require("../models/user.model.js");

const asyncHandler = require('express-async-handler')

const RegisterUser = asyncHandler(async (req, res) => {
    const { name, dateOfBirth, email, password, picture } = req.body;

    const userExistsAlready = await RNuser.findOne({ email });
    if (userExistsAlready) {
        res.status(400).json("user already exists");
        return;
    };
    const user = await RNuser.create({
        name,
        email,
        password,
        dateOfBirth,
        picture,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            picture: user.picture,

        })
    } else {
        res.status(400).json("Invalid user data");
    }
});

const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await RNuser.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            picture: user.picture,
        });
    } else {
        res.status(401).json("Invalid email or password");
    }
});

module.exports = { RegisterUser, LoginUser };
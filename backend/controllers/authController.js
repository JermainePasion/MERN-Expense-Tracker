const User = require("../models/User")
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({id
}, process.env.JWT_SECRET, {expiresIn: "1h"});
}

exports.registerUser = async (req,res) => {

    if (!req.body || !req.body.fullName || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: "All fields are required" });
    }


    const {fullName, email, password, profileImageUrl} = req.body;

    



    //check if exisint email
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"email already in use"});
        }

        const user = await User.create({
            fullName, 
            email, 
            password, 
            profileImageUrl,
        });

        res.status(201).json({
            id: user._id, 
            user,
            token: generateToken(user._id),
        });
    } catch (err){
        res
        .status(500)
        .json({message: "Error registering user", error: err.message});
    }
};

exports.loginUser = async (req,res) => {};

exports.getUserInfo = async (req,res) => {};
const User = require("../models/User")
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({id
}, process.env.JWT_SECRET, {expiresIn: "1d"});
}

exports.registerUser = async (req,res) => {
    console.log(req.body);

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

exports.loginUser = async (req,res) => {
    const {email, password} = req.body;
    if (!email || !password){
        return res.status(400).json ({message: "All fields are required!"});
    }
    try{
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message: "Incorrect email or password"});
        }

        res.status(200).json({
            user: {
                id: user._id,
                name: user.fullName,
                email: user.email,
                profileImageUrl: user.profileImageUrl
            },
            token: generateToken(user._id)
        })
        console.log("User login successful, sending response:", {
            user: {
                id: user._id,
                name: user.fullName,
                email: user.email,
            },
            token: generateToken(user._id)
        });
        
        
    } catch (err){
        res
        .status(500)
        .json({message: "Error registering user", error: err.message});
    }
};

exports.getUserInfo = async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
    
    if(!user) {
        return res.status(400).json ({message: "User not found"});
    }

    res.status(200).json(user);
    } catch (err){
        res
        .status(500)
        .json({message: "Error registering user", error: err.message});
    }
};
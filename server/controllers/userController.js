const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const { User } = require('../model/User');
const { Account } = require('../model/Account');

const userSignupSchema = zod.object({
    "username": zod.string().email(),
    "firstName": zod.string(),
    "lastName": zod.string(),
    "password": zod.string()
})

const userSigninSchema = zod.object({
    "username": zod.string().email(),
    "password": zod.string()
})

const userSignUp = async (req, res) => {
    try {
        const { username, firstName, lastName, password } = req.body;
        const inputValidation = userSignupSchema.safeParse(req.body);
        if (!inputValidation.success) {
            const obj = inputValidation.error;
            return res.status(411).json(obj.issues.map(errmsg => `${errmsg.path[0]}:${errmsg.message}`));
        }

        const duplicateUser = await User.find({ "username": username });
        if (duplicateUser.length)
            return res.status(411).json({ msg: "username(email) already exists" });

        const hashedpwd = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username, firstName, lastName, password: hashedpwd
        })

        const userId = newUser._id;

        const userAccount = await Account.create({
            "userId":userId,"balance":(Math.ceil(Math.random()*1000))+1
        })

        const token = jwt.sign({ "userId": userId }, process.env.jwtpassword);

        res.status(200).json({
            message: "User created successfully",
            token: token
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const userSignIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const inputValidation = userSigninSchema.safeParse(req.body);
        if (!inputValidation.success) {
            const obj = inputValidation.error;
            return res.status(411).json(obj.issues.map(errmsg => `${errmsg.path[0]}:${errmsg.message}`));
        }
        const user = await User.findOne({ "username": username });
        if (!user)
            return res.status(411).json({ msg: "Invalid credintials" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(411).json({ msg: "Invalid credintials" });
        const userId = user._id;
        const token = jwt.sign({ "userId": userId }, process.env.jwtpassword);
        res.status(200).json({ token: token })
    } catch (error) {
        res.status(411).json({ err: error.message });
    }
}

const userUpdation = async (req,res)=>{
    try {
        const { firstName,lastName,password } = req.body;
        const userId = req.userId;
        let hashedpwd;
        if(password){
            hashedpwd = await bcrypt.hash(password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(userId,{firstName,lastName,"password":hashedpwd},{new:true});
        if(updatedUser)
            return res.status(201).json({msg:"Updated Successfully"});
    } catch (error) {
        res.status(411).json({error:error.message});
    }
}

const sendByQuery = async (req,res)=>{
    try {
        const filter = req.query.filter || " ";
        const filteredUsers = await User.find({
            $or:[
                {firstName:{$regex:filter,$options:"i"}},
                {lastName:{$regex:filter,$options:"i"}},
            ]
        })
        const result = filteredUsers.map((user)=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            userId:user._id,
        }))
        res.status(200).json(result);
    } catch (error) {
        res.status(411).json({error:error.message});
    }
}


module.exports = {
    userSignUp,
    userSignIn,
    userUpdation,
    sendByQuery
}


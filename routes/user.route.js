const express = require('express');
const { UserModel } = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const UserRouter = express.Router()

// Signup routes for my todo app
UserRouter.post('/signup',async(req,res)=>
{
    const {email,password,ipaddress}=req.body
    const userPresent = await UserModel.findOne({email})
    if(userPresent?.email)
    {
        res.send({"msg":"Try loggin in , already logged in"})
    }
    else {
        try{
            bcrypt.hash(password,5, async function(err,hash){
                const todouser = new UserModel({email, password:hash,ipaddress})
                await todouser.save()
                res.send({"msg":"Signup successful"})
            })


        }
        catch(err)
        {
            console.log(err)
            res.send({"msg":"Something went wrong , try again later"})
        }
    }

})


// Login routes for my todo application

UserRouter.post('/login',async(req,res)=>
{
    const {email,password}= req.body
    try{
        const user = await UserModel.find({email})
        // console.log(user)
        if(user.length>0)
        {
            const hash_password = user[0].password
            bcrypt.compare(password,hash_password,function(err,result){
                if(result)
                {
                    const token = jwt.sign({"userID":user[0]._id},process.env.SecretKey)
                    res.send({"msg":"Successfully login","token":token})
                }
                else{
                    res.send({"msg":"something went wrong"})
                }
            })

        }else{
            res.send({"msg":"Something went wrong"})
        }

    }
    catch(err)
    {
        res.send({"msg":"Something went wrong , try again later"})
    }
})












module.exports = {UserRouter}
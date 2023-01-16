// /users/register ==> To register a new user.
// /users/login ==> For logging in generating a token


const express=require("express")
require("dotenv").config()

const {UserModel}= require("../models/app.model")

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name, email, gender, password}=req.body
    try {
        bcrypt.hash(password,10,async(err,secure_password)=>{
            if(err) console.log(err)
            else{
                const user=new UserModel({name,password:secure_password,email,gender})
                await user.save()
                res.send("Resiter Done")
            }
        })
        
    } catch (err) {
        res.send("Usre is not able to Register")
        console.log(err)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.find({email})
        const hashed_password=user[0].password

        if(user.length>0){
            bcrypt.compare(password,hashed_password,(err,result)=>{
                if(result){
                    const token= jwt.sign({userID:user[0]._id},process.env.key)
                    res.send({"msg":"User found Login Success","token":token})
                }else{
                    res.send("Entered Details are not correct")
                    console.log("ERROR")
                }
            })
        }else res.send("Entered Details are not correct")
        
    } catch (err) {
        res.send("Some ERROR happended")
        console.log(err)
    }
})

module.exports={
    userRouter
}

// Technique 2 (auto-gen a salt and hash):

// ```javascript
// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//     // Store hash in your password DB.
// });

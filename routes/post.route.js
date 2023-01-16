// /posts ==> This will show the posts of logged in users.
// /posts/update ==> The logged in user can update his/her posts.
// /posts/delete ==> The logged in user can delete his/her posts.
// "PC", "TABLET", "MOBILE"

const express=require("express")
require("dotenv").config()

const {PostModel} = require("../models/post.model")

const postRoute= express.Router()

postRoute.post("/",async(req,res)=>{
    const all_users=await PostModel.find()
    res.send(all_users)
})

postRoute.post("/create",async(req,res)=>{
    const payload=req.body
    try{
        const new_post=new PostModel(payload)
        await new_post.save()
        res.send("Post is created by User")
    }catch(err){
        res.send("ERROR while creating post")
        console.log(err)
    }
})
postRoute.post("/update/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const userPost= await PostModel.findOne({"_id":id})
    const postUserID=userPost.userID
    const reqUserID=req.body.userID
    try{
        if(reqUserID!==postUserID){
            res.send("You are not authorized")
        }else{
            await PostModel.findByIdAndUpdate({"_id":id},payload)
            res.send("Updated the Post")
        }
    }catch(err){
        res.send({"msg":"Something went wrong"})
    }
})
postRoute.post("/delete/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const userPost= await PostModel.findOne({"_id":id})
    const postUserID=userPost.userID
    const reqUserID=req.body.userID
    try{
        if(reqUserID!==postUserID){
            res.send("You are not authorized")
        }else{
            await PostModel.findByIdAndDelete({"_id":id},payload)
            res.send("Deleted the Post")
        }
    }catch(err){
        res.send({"msg":"Something went wrong"})
    }
})

module.exports={
    postRoute
}
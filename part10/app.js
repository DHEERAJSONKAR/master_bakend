const express = require("express")
const app = express()
const userModel = require("./models/user")
const postModel = require("./models/post")
app.get("/",(req,res)=>{
    res.send("Hello World from part10")
})
app.get("/create", async (req,res)=>{
   let user = await userModel.create({
        username: "john_doe",
        email: "dk@123gmail.com",
        age:34
    })
    res.send(user)
})
app.get("/post/create", async (req,res)=>{
   const post =  await postModel.create({
        postdata: "this is my first post",
        user : "693c4365d01ee503f41ee013"
    })
    let user = await userModel.findOne({_id: "693c4365d01ee503f41ee013"})
    user.post.push(post._id)
    await user.save()
    
    res.send({post, user})
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})
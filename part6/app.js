const express = require("express");
const app = express();
const userModel = require("./userModel")

app.get("/",(req,res)=>{
    res.send("dk boy")

})
app.get("/create", async (req,res)=>{
    const createduser = await userModel.create({
        name:"dheeraj sonkar",
        email:"dheeraj12@gmail.com",
        password:"dheeraj1234"
    })
    res.send(createduser)
})
app.get("/update", async (req,res)=>{
   const updateduser =  await userModel.findOneAndUpdate({name:"john"}, {name:"raj kumar sonkar"}, {new:true})
    res.send(updateduser)
})
app.get("/read",  async (req,res)=>{
    const read =  await userModel.find()
    res.send(read)
})
app.get("/delete", async (req,res)=>{
   const deleteduser =  await userModel.findOneAndDelete({name:"raj kumar sonkar"})
    res.send(deleteduser)
})
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
const express = require('express');
const app = express();
const path = require('path')
const userModel = require("./models/user")
app.set('view engine', "ejs")
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname + '/public')))

app.get("/", (req,res)=>{
    res.render("index")
} )
app.get("/read", async (req,res)=>{
    let allUsers = await userModel.find({})
    res.render("read", {users: allUsers})
})
app.get("/edit/:id", async (req,res)=>{
    let userId = req.params.id;
    let userDetails = await userModel.findById(userId);
    res.render("edit", {user: userDetails})
})
app.post("/update/:id", async (req,res)=>{
    let userId = req.params.id;
    let {name, email, image} = req.body;
    await userModel.findByIdAndUpdate(userId, {
        name: name,
        email: email,
        image: image
    } ,{new: true})
    res.redirect('/read')
})
app.post("/create", async (req,res)=>{
    let {name, email, image} = req.body;

let createdUser = await userModel.create({
    name: name,
    email: email,
    image: image
})
res.redirect('/read')

})
app.get("/delete/:id", async (req,res)=>{
    let userId = req.params.id;
    await userModel.findByIdAndDelete(userId);
    res.redirect('/read')
})

app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})
const express = require("express")
const app = express();
const bcrypt = require("bcrypt")
const userModel = require("./models/user")
const cookieParser = require("cookie-parser")
app.use(cookieParser())
const jwt = require("jsonwebtoken")
const path = require("path");
const { hash } = require("crypto");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.get("/", (req, res) => {
    res.render("index")
})
app.post("/create", (req, res) => {
    let { username, password, email, age } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createdUser = await userModel.create({
                username,
                 password: hash,
                  email,
                  age
            })
           const token =  jwt.sign({email}, "dsfdfdfsd")
           res.cookie("token", token)
            res.send(createdUser)

        })
    })

})
app.get("/delete",(req,res)=>{ 

})
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
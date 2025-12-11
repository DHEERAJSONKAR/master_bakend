const express = require("express");
const app = express()
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")

app.use(cookieParser())

app.get("/", (req,res)=>{
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("dheeraj@1232", salt, function(err, hash) {
            console.log("Hashed:", hash)
        });
    });
    
    const token = jwt.sign({email: "dheeraj@gmail.com"}, "secretkey")
    res.cookie("token", token)
    res.cookie("name", "dheeraj Sonkar")
    console.log("Token:", token) 
    res.send("Cookie has been set. Visit /verify to check")
})

app.get("/read", (req,res)=>{
    console.log("Cookies:", req.cookies)
    
    bcrypt.compare("dheeraj@1232", "$2b$10$9EOk1cDn/72NBBFuJNS2DeXdRmYSX6586Vf/G6BjQAs8icLxop2HW", function(err, result) {
        console.log("Password match:", result)
    });
    
    res.send("director dheeraj sonkar")
})

app.get("/verify", (req,res)=>{
    try {
        let data = jwt.verify(req.cookies.token, "secretkey")
        console.log("Verified data:", data)
        res.send("Token verified! Email: " + data.email)
    } catch(err) {
        console.log("JWT Error:", err.message)
        res.send("Invalid token! Visit / first to create new token")
    }
})

app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})
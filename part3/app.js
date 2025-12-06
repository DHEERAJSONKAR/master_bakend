const express = require('express');
const app = express();
app.use((req,res,next)=>{
    console.log("middleware called"); 
    next()
})
app.get("/", (req,res)=>{
    res.send("director dheeraj")
})
app.get("/actor", (req,res)=>{
    res.send("actor director dheeraj"); 
})
app.get("/movie",(req,res, next)=>{
    return next(new Error("something went wrong in movie route."))
})

app.use((err, req,res,next)=>{
    console.error(err.stack)
    res.status(500).send("Something went wrong! we dont't know how to handle it.")
})
app.listen(3001,()=>{
    console.log("server is running on port 3001");
})
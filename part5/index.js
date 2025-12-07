const express= require("express")
const app = express()
const fs = require("fs")
const path = require("path")
app.set("view engine", "ejs")
 app.use(express.json())
 app.use(express.urlencoded({extended:true}))
 app.use(express.static(path.join(__dirname,"public")))



app.get("/", (req,res)=>{
    fs.readdir("./file",(err, file)=>{
       res.render("index", {file:file}) 
    })
    
})
app.get("/file/:filename", (req,res)=>{
    fs.readFile(`./file/${req.params.filename}`, "utf-8", function(err, filedata){
        res.render("show", {filename:req.params.filename, filedata:filedata}) 
    })
})

app.get("/edit/:filename", (req,res)=>{
    res.render("edit")
})

app.post("/create", (req,res)=>{
    fs.writeFile(`./file/${req.body.title.split(' ').join('')+ ".txt"}`, req.body.details, function(err){
        res.redirect("/")

    })
})

app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})
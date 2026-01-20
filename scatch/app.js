const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const Path = require("path");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(Path.join(__dirname,"public")));
app.set("view engine","ejs");
const mongooseConnection = require("./config/mongoose-connection");

app.use("/owners", ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
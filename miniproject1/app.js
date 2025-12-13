const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const userModel = require('./models/user');
const postModel = require('./models/post');
const path = require('path'); 
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});
app.get("/profile", isLoggedIn, async (req,res)=>{ 
  let user = await userModel.findOne({email: req.user.email})
  
  res.render("profile", {user:user})

})
app.post("/post", isLoggedIn, async (req,res)=>{
  let user = await userModel.findOne({email: req.user.email})
  let {content} = req.body;
  let post = await postModel.create({
    user: user._id,
    content
  })
  user.post.push(post._id)
  await user.save()
  res.redirect("/profile")
})
app.get("/login", (req,res)=>{
  res.render("login")
})
app.post('/register', async (req, res) => {
  let { name, email, password, age, username } = req.body;
  let user  = await userModel.findOne({email})
  if(user) return res.status(500).send("User already exists") 
    bcrypt.genSalt(10, (err, salt) => {
     bcrypt.hash(password, salt, async (err, hash)=>{
     const user = await userModel.create({
        name,
        email,
        age,
        username,
        password: hash 
      })
      let token = jwt.sign({email:email, userid: user._id}, "ds")
      res.cookie("token", token)
      res.redirect("/login")

     })
    
    })
})
app.post("/login",async (req,res)=>{
  const {email, password} = req.body;
  const user = await userModel.findOne({email})
  if(!user) return res.status(500).send("something went wrong")
  bcrypt.compare(password, user.password,(err, result)=>{
if(result) {
  
  let token = jwt.sign({email:email, userid: user._id}, "ds")
      res.cookie("token", token)
      res.status(200).redirect("/profile")
}
else res.redirect("/login")
  })
})
app.get('/logout', (req, res) => {
  res.cookie('token', '');
  res.redirect('/login')
  })

  function isLoggedIn(req,res,next){
    if(req.cookies.token === "") res.redirect("/login")
      else{
    let data = jwt.verify(req.cookies.token, "ds")
    req.user = data
    next()
      }
  }

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
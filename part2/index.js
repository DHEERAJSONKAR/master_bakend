// const fs = require('fs');
// fs.rename("dk.txt", "hello.txt", function(err){
//     if(err) console.error(err);
//     else console.log("File created successfully.");
// })
// fs.unlink("hello.txt", function(err){
//     if(err) console.error(err);
//     else console.log("File deleted successfully.");
// })
const http = require("http");
const server = http.createServer((req,res)=>{
    res.end("hello world");
})
server.listen(3000);
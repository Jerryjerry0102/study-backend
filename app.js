const express = require("express");
const app = express();

const port = 8000;

app.get("/", (req,res) => {
    res.sendFile(__dirname+"/text.html");
    // res.send("hello");
})
//res.send("hello");
//res.send("<html></html>")
// res.sendfile(__dirname+"/test.html");

app.listen(port, () => {
    console.log("server open: ", port);
})
// 서버에 node.js를 구축했다면 공인ip:8000/
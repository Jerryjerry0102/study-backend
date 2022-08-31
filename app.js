const e = require("express");
const express = require("express"); 
const app = express();  
// 8.31
const multer = require("multer");
const path = require("path");
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done( null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, req.body.id + ext);
            // done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5*1024*1024 }, // 5MB 파일용량제한
})
//   
const port = 8000;

app.set("view engine", "ejs");      

app.use("/static", express.static("static"));
app.use('/static', express.static('public'));
app.use("/uploads", express.static("uploads"));

// 8.30 수업
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//

var person = [
    { name: "박재희", gender: "여자", age: 25, hobby: "책읽기"},
    { name: "홍길동", gender: "남자", age: 29, hobby: "축구하기"},
    { name: "김민지", gender: "여자", age: 26, hobby: "영화보기"},
    { name: "박승호", gender: "남자", age: 28, hobby: "음악듣기"}
]
var one = "this is one";
var two = "this is two";

app.get('/',(req, res) => { 
    res.render('test2_0',{person: person, one: one, two: two});
});

app.get('/test2_1',(req, res) => {
    res.render('test2_1',{
        one: "this is one",
        two: "this is two"
    });
});

app.get('/test2_2',(req, res) => {
    res.render('test2_2',{person: person});
});


// 8.30 수업 
app.get("/main", (req, res) => {
    res.render('main', {})
})
app.get("/get", (req, res)=>{
    console.log(req.query);
    // cleint가 요청하는 정보를 담고 있는게 req
    // 여기서 console를 찍으면 서버에 console이 찍힘
    res.render("login", {
        name: req.query.name
        // 이렇게 적으면 name정보만 불러오게 됨.
    });
})
app.post("/post", (req, res) => {
    console.log(req.body);
    // post를 통해서 서버에 form전송을 보내면 req.body에 정보가 담긴다.
    res.render("login", {
        name: req.body.name,
        gender: req.body.gender,

    })
})
// cleint에서 /post url로 post요청이 들어올 때 아래 함수를 실행시키겠따.
// post는 인터넷 url로 직접 접속할 수 없음.
// 주소를 잘 선언해 놨지만 /post라고 하고 접속하면 접속할 수 없다. 위에 적은 /get은 가능하다
app.get("/main2", (req, res) => {
    res.render("main2",{});
})

app.get("/get/ajax", (req, res) => {
    console.log(req.query);
    var data = {
        name: req.query.name,
        gender: req.query.gender
    }
    res.send(req.query);
})

app.get("/main3", (req, res) => {
    res.render("main3",{});
})

app.get("/get/axios", (req, res) => {
    console.log(req.query);
    var data = {
        name: req.query.name,
        gender: req.query.gender
    }
    res.send(req.query);
})


// 8.30 실습
app.get("/prac1", (req, res) => {
    res.render('prac1', {})
})
app.post("/prac1_post", (req, res) => {
    console.log(req.body);
    // res.render("prac1_post", {
    //     name: req.body.name,
    //     gender: req.body.gender,
    //     birth: req.body.birth
    // })
    res.send(req.body);
})

app.get("/prac2", (req, res) => {
    res.render("prac2", {});
})
app.get("/get/axios2", (req, res) => {
    console.log(req.query);
    var data = {
        name: req.query.name,
        gender: req.query.gender,
        birth: req.query.birth,
        interest: req.query.interest
    }
    res.send(req.query);
})

app.get("/prac3", (req, res) => {
    res.render("prac3", {
        id: "miso6495",
        password: "mm6495"
    });
})
app.post("/get/axios3", (req, res) => {
    console.log(req.body);
    if(req.body.id == "miso6495" & req.body.password == "mm6495"){
        res.send("성공")
    }
    else{
        res.send("실패")
    }
    // var data = {
    //     id: req.body.id,
    //     password: req.body.password
    // }
    // res.send(req.body);
})

// 집에서 혼자
app.get("/prac11", (req, res) => {
    res.render("prac11", {})
})
app.post("/prac11_post", (req, res) => {
    console.log(req.body);
    res.render("prac11_post",{
        name: req.body.name,
        gender: req.body.gender,
        year: req.body.year
    })
    // res.send(req.body);
})

app.get("/prac22", (req, res) => {
    res.render("prac22",{});
})

app.get("/get/axios22", (req, res) => {
    console.log(req.query);
    res.send(req.query);
})

// 8.31
app.get("/aaaa", (req, res) => {
    res.render('aaaa', {})
})

app.get("/bbbb", (req, res) => {
    res.render('bbbb', {})
})

app.post("/upload", upload.single("userfile") ,(req, res) => {  //upload.single은 파일을 하나 업로드하겠다는 의미 ""은 input name에 매칭됨. 여러개는 array라고 입력
    console.log(req.body);
    console.log(req.file);                      // file은 파일 하나일 때 files는 여러 개 전송할 때
    res.send("업로드 성공");
})

// app.post("/upload", upload.fields([{name:"userfile"},{name:"usefile"}]) ,(req, res) => {  // input이 두개 일때 fields
//     console.log(req.body);
//     console.log(req.files);                     
//     res.send("업로드 성공");
// })


// 8.31 실습
app.get("/prac4", (req, res) => {
    res.render('prac4', {})
})
app.post("/prac4_upload", upload.single("photo"), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.render("prac4_upload", {
        photo: req.file.filename
    })
    // res.send("업로드 성공");
})

app.listen(port, ()=>{
    console.log("server open: ", port);
});

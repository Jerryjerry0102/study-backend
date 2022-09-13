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
            done(null, req.body.name + ext);
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

// 9.13 //
const cookieParser = require("cookie-parser");
app.use(cookieParser()); // module 사용할 때 이렇게 연결 지어줘야 함

const session = require("express-session");
app.use(session({
    secret: '1234', // 암호화할 때 사용할 문자열(cookie는 선택 session은 암호화 기본)
    resave: false,              // 요청이 들어올 때마다 session에 저장을 할 건지 말 건지 
    saveUninitialized: true,    // resave랑 이거는 그냥 외우자
    // secure: true,               // https 보안서버에서만 동작하겠다는 의미
    cookie: {
        maxAge: 60000,
        httpOnly: true
    }
    // 원래 session은 브라우저를 끄면 사라진다고(여기서는 다시 id발급) 했는데
    // 이렇게 cookie를 설정해주면 60초 동안은 받은 id를 유지한다.
}));
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
    // axios 백에서는 res.send()를 이용해 데이터를 보낸다.
    // res.send를 이용하면 데이터를 클라이언트로 다시 보낼 수 있다.
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
app.post("/post/axios3", (req, res) => {
    console.log(req.body);
    if(req.body.id == "miso6495" & req.body.password == "mm6495"){
        res.send("성공")
    }
    else{
        res.send("실패")
    }
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

app.get("/prac33", (req, res) => {
    res.render("prac33", {});
})
app.post("/post/axios33", (req, res) => {
    console.log(req.body);
    if(req.body.id == "miso6495" && req.body.password == "mm6495"){
        res.send("로그인 성공");
    }
    else{
        res.send("로그인 실패");
    }
})


// 8.31
app.get("/file", (req, res) => {
    res.render('file', {})
})

app.get("/file_axios", (req, res) => {
    res.render('file_axios', {})
})

app.post("/upload", upload.fields([{name:"name"},{name:"usefile"}]), function(req, res){  
//upload.single은 파일을 하나 업로드하겠다는 의미 ""은 input name에 매칭됨. 여러개는 array라고 입력
    console.log(req.files);              // file은 파일 하나일 때 files는 여러 개 전송할 때
    console.log(req.body);
    res.send("업로드 성공");
})

app.get("/file_axioss", (req, res)=> {
    res.render("file_axioss", {})
})

app.post("/dynamicFile", upload.fields([{name: "name"}, {name:"userfile"}]), (req, res) => {
    console.log(req.files);
    console.log(req.body);
    res.send("업로드");
})

// app.post("/upload", upload.fields([{name:"userfile"},{name:"usefile"}]) ,(req, res) => {  
// // input이 두개 일때 fields 그리고 가로 안에 저렇게 name입력 해줘야 함
//     console.log(req.body);
//     console.log(req.files);                     
//     res.send("업로드 성공");
// })


// 8.31 실습
app.get("/prac4", (req, res) => {
    res.render('prac4', {});
})
app.post("/prac4_upload", upload.single("photo"), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.render("prac4_upload", {
        photo: req.file.filename
    })
    // res.send("업로드 성공");
})


// 집에서 혼자
app.get("/prac44", (req, res) => {
    res.render("prac44", {});
})
app.post("/prac44_upload", upload.single("photo"), (req, res) => {
    console.log(req.file.filename);
    console.log(req.body);
    res.render("prac44_upload", {
        photo:req.file.filename
    })
});  

// prac4 axios버전
app.get("/prac4_axios", (req, res) => {
    res.render("prac4_axios", {});
})
app.post("/prac4_axios_upload", upload.fields([{name: "id"}, {name:"password"}, {name:"name"}, {name:"age"}, {name:"photo"}]), (req, res) =>{
    console.log(req.files);
    console.log(req.body);
    console.log(req.body.id);
    console.log(req.body.name);
    res.send(req.files);
})
// img파일의 filename이 req.body.id + ext로 되게 설정을 했고 console로 req.body.id를 해도 잘 나오는데
// 어째서 저장은 undefined.jpg로 나오는지 정말 모르겠어요.
// 살려주세요. 


// 9.13 cookie & session 수업
// cookie
app.get("/cookie", (req, res) => {
    // res(서버에 응답할 때) cookie를 보내주겠다.
    res.cookie('key1','value1',{
        maxAge: 10000,      // 쿠키가 설정된 시간부터 30초 뒤까지 쿠키를 유지시키겠다. 
                            // ms 단위, cookie 만료 시간 설정
        // expires:,           // maxAge랑 역할은 같음, gnt단위, cookie 만료 시간 설정
        // path: "/cookie",    // localhost:8000/cookie로 시작할 모든 주소에 cookie 적용
        // secure: true,       // 보안서버(https)에서만 동작
        // httpOnly: true      // ejs파일 script태그 안에서 원래 document.cookie로 접근 가능한데 
                            // httpOnly: true 위처럼 접근 불가능
                            // httpOnly: false 위처럼 접근 가능
        // signed: true     // 쿠키암호화
    })
    res.render("index");
})

// cookie 확인
app.get("/cookie/get", (req, res) => {
    // 쿠키는 클라이언트에게 저장됨
    // 클라이언트한테 있는 만들어진 쿠키 확인이니까 req
    res.send(req.cookies);
})

// cookie prac(modal)
app.get("/cookie/modal", (req, res) => {
    res.render("modal");
})
app.post("/cookie/modal/check", (req, res) => {
    res.cookie('cookie','check',{
        maxAge: 5000, 
        httpOnly: false
    })
    res.send("쿠키생성");
})

// session //
app.get("/session", (req, res) => {
    res.session.key1 = "value1";
    console.log(req.session)
    res.render("index")
})

// session // login
app.get("/session/main", (req, res) => {
    console.log(req.session);
    if(req.session.user != undefined){
        res.render("session_main" , { login: true, user: req.session.user });
    }else{
        res.render("session_main", { login: false });
    }
})
app.get("/session/login", (req, res) => {
    res.render("session_login");
})
var info = {
    id: "a",
    pw: "1"
}
app.post("/session/login", (req, res) => {
    console.log(req.body.id)
    if(req.body.id == info.id && req.body.pw == info.pw){
        req.session.user = info.id;
        res.send(true);
    }else{
        res.send("아이디 또는 비밀번호를 잘못 입력하셨습니다.");
    }
})

app.get("/session/logout", (req, res) => {
    req.session.destroy(function(){     // session 전체 삭제
        res.redirect("/session/main");
    }) 
    // delete req.session.key1;            // 원하는 session key만 삭제하는 방법
})
//


// 위에 실습 약간 다르게 한 번 더 //

// main페이지
app.get("/session/main2", (req, res) => {
    res.render("session_main2");
})

// 로그인 페이지
app.get("/session/login2", (req, res) => {
    res.render("session_login2");
})
var info2 = {
    id: "jerry",
    pw: "0102"
}
app.post("/session/login2", (req, res) => {
    console.log(req.body);
    if(req.body.id == info2.id && req.body.pw == info2.pw){
        req.session.user = info2.id;
        res.render("session_profile", {user: req.session.user})
    }
    else{
        res.send("<script> alert('아이디 또는 비밀번호를 잘못 입력하셨습니다.'); window.location = '/session/login2'; </script>")
    }
})

// 프로필 페이지
app.get("/session/profile", (req, res) => {
    if(req.session.user != undefined ){  // user가 있으면 true가 나오고 없으면 undefined가 나올거임
        res.render("session_profile");      // 로그인이 되어 있으면 profile로
    }else{
        res.redirect("/session/login2");     // 아니면 이미 만들어져있는 router로(get요청) 다시 이동시키겠다.
    }
})

// 로그아웃
app.get("/session/logout2", (req, res) => {
    // delete req.session.key1; 
    req.session.destroy(function(){     // session 전체 삭제
        res.redirect("/session/main2");
    }) 
})
//


app.listen(port, ()=>{
    console.log("server open: ", port);
});
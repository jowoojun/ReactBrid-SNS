const express = require('express');
const db = require('./models');
const cors = require('cors')
const passport = require('passport')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const app = express();

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const passportConfig = require('./passport');

// 환경변수 설정
dotenv.config()

// Access-Control-Allow-Origin 에러
app.use(cors({ 
  origin: 'http://localhost:3000', // front 서버 주소
  credentials: true, // 쿠키도 같이 전달하고 싶으면 true로 해야함. 쿠키 사용시 true 안하면 401에러가 뜸.
}))

// front로부터 데이터 받기 설정
app.use(express.json()); // front에서 데이터를 json 형식으로 받음
app.use(express.urlencoded({ extended: true })); // form 태그의 submit 데이터를 전송받음

// 로그인 관련
app.use(session({ // session
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
})) 
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(process.env.COOKIE_SECRET));
passportConfig();

// 라우터 관련
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/posts', postsRouter);

// db연결
db.sequelize.sync().then(() => {
  console.log("DB연결 성공");
}).catch(console.error);

// 기본화면
app.get('/', (req, res) => {
  res.send('Hello, Express!')
})

// 에러를 처리하기 위한 middle ware
// app.use((err, req, res, next => {
  
// })

// 서버 실행
app.listen(3080, () => {
  console.log('running...!')
});
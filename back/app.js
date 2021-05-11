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
const passportConfig = require('./passport');

// 환경변수 설정
dotenv.config()

// Access-Control-Allow-Origin 에러
app.use(cors({ 
  origin: '*', // 모든 url 접근 허락
  credentials: false,
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

// db연결
db.sequelize.sync().then(() => {
  console.log("DB연결 성공");
}).catch(console.error);

// 기본화면
app.get('/', (req, res) => {
  res.send('Hello, Express!')
})

// 서버 실행
app.listen(3080, () => {
  console.log('running...!')
});
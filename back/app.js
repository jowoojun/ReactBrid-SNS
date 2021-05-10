const express = require('express');
const db = require('./models');
const cors = require('cors')
const app = express();

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

app.use(cors({ // Access-Control-Allow-Origin 에러
  origin: '*', // 모든 url 접근 허락
  credentials: false,
}))
app.use(express.json()); // front에서 데이터를 json 형식으로 받음
app.use(express.urlencoded({ extended: true })); // form 태그의 submit 데이터를 전송받음

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

// db연결
db.sequelize.sync().then(() => {
  console.log("DB연결 성공");
}).catch(console.error);

app.get('/', (req, res) => {
  res.send('Hello, Express!')
})

app.listen(3080, () => {
  console.log('running...!')
});
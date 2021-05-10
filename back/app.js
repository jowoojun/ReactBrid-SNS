const express = require('express');
const db = require('./models');

const app = express();

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

app.use('/api', userRouter);
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
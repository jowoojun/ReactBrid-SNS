const express = require('express');

const app = express();

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

app.get('/', (req, res) => {
  res.send('Hello, Express!')
})

app.use('/api', userRouter);
app.use('/api/post', postRouter);

app.listen(3080, () => {
  console.log('running...')
});
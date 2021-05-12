const express = require('express')
const router = express.Router();

const { Post, Comment, Image, User } = require('../models');
const { needLogin } = require('./middlewares')

router.get('/', (req, res) => {
  res.send('Hello, get post!')
})

router.post('/', needLogin, async (req, res, next) => {
  try{
    const post = await Post.create({
      UserId: req.user.id,
      content: req.body.content,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image,
      }, {
        model: Comment,
      }, {
        model: User,
      }]
    })

    res.status(201).json(fullPost); // 201: 데이터 생성 성공
  } catch(err) {
    console.error(err);
    next(err);
  }
})

router.delete('/', (req, res) => {
  res.send('Hello, delete post!')
})

module.exports = router;
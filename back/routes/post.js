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

router.post('/:postId/comment', needLogin, async (req, res, next) => {
  try{
    const post = await Post.findOne({
      where: { id: req.params.postId}
    })
    if(!post){
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }

    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: Post,
      }, {
        model: User,
      }]
    })

    res.status(201).json(fullComment); // 201: 데이터 생성 성공
  } catch(err) {
    console.error(err);
    next(err);
  }
})

module.exports = router;
const express = require('express')
const router = express.Router();

const { Post, Image, Comment, User } = require('../models')

router.get('/', async (req, res, next) => {
  try{
    const posts = await Post.findAll({
      limit: 10,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [{
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User, // 댓글 작성자
          attributes: ['id', 'nickname'],
        }]
      }, {
        model: User, // 게시글 작성자
        attributes: ['id', 'nickname']
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Liker',
        attributes: ['id']
      }]
    })
    res.status(200).send(posts);
  } catch(err) {
    console.error(err);
    next(err);
  }
});
module.exports = router;
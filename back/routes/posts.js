const express = require('express')
const router = express.Router();
const { Op } = require('sequelize');

const { Post, Image, Comment, User } = require('../models')

router.get('/', async (req, res, next) => {
  try{
    const where = {};
    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
    } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    const posts = await Post.findAll({
      where,
      limit: parseInt(req.query.limit),
      order: [
        ['createdAt', 'DESC']
      ],
      include: [{
        model: Post,
        as: 'Retweet',
        include: [{
          model: User, // 리트윗 타겟 게시글 작성자
          attributes: ['id', 'nickname']
        }, {
          model: Image, // 리트윗 타겟 이미지
        }]
      }, {
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
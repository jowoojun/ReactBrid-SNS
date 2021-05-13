const express = require('express')
const router = express.Router();

const { Post, Image, Comment, User } = require('../models')

router.get('/', async (req, res, next) => {
  try{
    const posts = await Post.findAll({
      limit: 10,
      order: [
        ['createdAt', 'DESC']
        [Comment, 'createdAt', 'DESC']
      ],
      include: [{
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }]
      }, {
        model: User,
        attributes: ['id', 'nickname']
      }]
    })
    res.status(200).send(posts);
  } catch(err) {
    console.error(err);
    next(err);
  }
});
module.exports = router;
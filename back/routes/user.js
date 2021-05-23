const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport');
const { Op } = require('sequelize');

const { User, Post, Image, Retweet, Comment } = require('../models');
const { needLogin, needNotLogin } = require('./middlewares')

router.get('/', async (req, res, next) => {
  try{
    if(req.user){
      const safeUser = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      })
      res.status(200).json(safeUser);
    } else {
      res.status(200).json(null);
    }
  } catch(err) {
    console.error(err)
    next(err);
  }
})

router.get('/:userId/posts', async (req, res, next) => {
  try{
    console.log(req.params.userId)
    const where = { UserId: parseInt(req.params.userId) };
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

router.get('/:id', async (req, res, next) => {
  try{
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Post,
        attributes: ['id'],
      }, {
        model: User,
        as: 'Followings',
        attributes: ['id'],
      }, {
        model: User,
        as: 'Followers',
        attributes: ['id'],
      }]
    })
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length;
      data.Followings = data.Followings.length;
      data.Followers = data.Followers.length;
      res.status(200).json(data);
    } else {
      res.status(404).json('존재하지 않는 사용자입니다.');
    }
  } catch(err) {
    console.error(err);
    next(err);
  }
})

router.post('/login', needNotLogin, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err){
      console.error(err);
      return next(err)
    }
    if(info){
      return res.status(401).send(info.reason) // 401: authenticate 관련 에러
    }
    return req.logIn(user, async (loginErr) => {
      if (loginErr){
        console.error(loginErr)
        return next(loginErr);
      }
      const safeUser = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      })
      return res.status(200).json(safeUser); // 200: 성공
    })
  })(req, res, next); // 미들웨어 확장!! => express기법 중 하나
})

router.post('/logout', needLogin, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok!');
})

router.post('/signUp', needNotLogin, async (req, res, next) => {
  try{
    const exUser = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if(exUser){
      return res.status(403).send('이미 사용중인 이메일입니다.') // 403: 허용되지 않는 요청
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    await User.create({
      email: req.body.email,
      nickname: req.body.nick,
      password: hashedPassword,
    })
    
    res.status(201).send('success') // 201: 데이터 생성 성공
  }catch(err) {
    console.error(err)
    next(err)
  }
})

router.patch('/nickname', needLogin, async (req, res, next) => {
  try{
    await User.update({
      nickname: req.body.nickname,
    }, {
      where: { id: req.user.id },
    })
    res.status(200).json({ nickname: req.body.nickname })
  } catch(err) {
    console.error(error);
    next(err);
  }
})

router.patch('/:userId/follow', needLogin, async (req, res, next) => {
  try{
    const user = await User.findOne({
      where: { id: req.params.userId }
    })
    if(!user){
      return res.status(403).send('해당 사용자가 존재하지 않습니다.')
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId) })
  } catch (err) {
    console.error(err);
    next(err)
  }
})

router.delete('/:userId/follow', needLogin, async (req, res, next) => {
  try{
    const user = await User.findOne({
      where: { id: req.params.userId }
    })
    if(!user){
      return res.status(403).send('해당 사용자가 존재하지 않습니다.')
    }
    await user.removeFollowers(req.user.id);
    res.status(201).json({ UserId: parseInt(req.params.userId) })
  } catch (err) {
    console.error(err);
    next(err)
  }
})

router.delete('/:userId/follower', needLogin, async (req, res, next) => {
  try{
    const user = await User.findOne({
      where: { id: req.params.userId }
    })
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId) });
  } catch(err) {
    console.error(err);
    next(err);
  }
})

router.get('/followings', needLogin, async (req, res, next) => {
  try{
    const user = await User.findOne({
      where: { id: req.user.id }
    })
    const followings = await user.getFollowings();
    res.status(200).json({ followings });
  } catch(err) {
    console.error(err);
    next(err);
  }
})

router.get('/followers', needLogin, async (req, res, next) => {
  try{
    const user = await User.findOne({
      where: { id: req.user.id }
    })
    const followers = await user.getFollowers();
    res.status(200).json({ followers });
  } catch(err) {
    console.error(err);
    next(err);
  }
})

module.exports = router;
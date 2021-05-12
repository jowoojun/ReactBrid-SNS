const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport');

const { User, Post } = require('../models');
const { needLogin, needNotLogin } = require('./middlewares')

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
        }, {
          model: User,
          as: 'Followings',
        }, {
          model: User,
          as: 'Followers',
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

router.post('/follow', needLogin, (req, res) => {
  res.send('Hello, follow!')
})

router.post('/unfollow', needLogin, (req, res) => {
  res.send('Hello, unfollow!')
})

module.exports = router;
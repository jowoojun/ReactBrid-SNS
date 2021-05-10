const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const { User } = require('../models')

router.post('/login', (req, res) => {
  res.send('Hello, login!')
})

router.post('/logout', (req, res) => {
  res.send('Hello, logout!')
})

router.post('/signUp', async (req, res, next) => {
  try{
    const exUser = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if(exUser){
      return res.status(403).send('이미 사용중인 이메일입니다.')
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    await User.create({
      email: req.body.email,
      nickname: req.body.nick,
      password: hashedPassword,
    })
    
    res.status(201).send('success')
  }catch(err) {
    console.error(err)
    next(err)
  }
})

router.post('/follow', (req, res) => {
  res.send('Hello, follow!')
})

router.post('/unfollow', (req, res) => {
  res.send('Hello, unfollow!')
})

module.exports = router;
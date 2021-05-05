const express = require('express')
const router = express.Router();

router.post('/login', (req, res) => {
  res.send('Hello, login!')
})

router.post('/logout', (req, res) => {
  res.send('Hello, logout!')
})

router.post('/signUp', (req, res) => {
  res.send('Hello, signUp!')
})

router.post('/follow', (req, res) => {
  res.send('Hello, follow!')
})

router.post('/unfollow', (req, res) => {
  res.send('Hello, unfollow!')
})

module.exports = router;
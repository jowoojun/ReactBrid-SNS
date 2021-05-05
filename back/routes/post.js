const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, get post!')
})

router.post('/', (req, res) => {
  res.send('Hello, post post!')
})

router.delete('/', (req, res) => {
  res.send('Hello, delete post!')
})

module.exports = router;
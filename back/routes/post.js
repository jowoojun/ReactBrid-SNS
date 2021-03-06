const express = require('express')
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Comment, Image, User, Hashtag } = require('../models');
const { needLogin } = require('./middlewares')

try{
  fs.accessSync('uploads')
} catch(err) {
  console.log('uploads 폴더가 없으므로 생성합니다.')
  fs.mkdirSync('uploads')
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done){
      done(null, 'uploads'); // 저장할 폴더의 이름
    },
    filename(req, file, done){
      const ext = path.extname(file.originalname) // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext) // 파일 이름(apple)
      done(null, basename + new Date().getTime() + ext) // 파일 이름 + 시간 + 확장자 -> apple19573829.png
    }
  }),
  limits: { fileSize: 50 * 1024 * 1024 } // 20MB
})

router.post('/', needLogin, upload.none(), async (req, res, next) => {
  // upload.none() => 실제 파일을 업로드하는 것은 아니지만 formData를 사용해보기 위해 사용해봄
  try{
    // 예시) req.body.content => '해시태그들은 아래와 같습니다. #노드 #익스프레스 #리엑트'
    const hashtag = req.body.content.match(/(#[^\s]+)/g); // ['#노드', '#익스프레스', '#리엑트'
    const post = await Post.create({
      UserId: req.user.id,
      content: req.body.content,
    });
    if(hashtag){ 
      const result = await Promise.all(hashtag.map((tag) => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase()}, // ['노드', '익스프레스', '리엑트']
      }))) // [['노드', true], ['익스프레스', true], ['리엑트', true]]
      await post.addHashtags(result.map((v) => v[0]));
    }
    if(req.body.image){
      if(Array.isArray(req.body.image)) { // 이미지가 여러개인 경우
        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })))
        await post.addImage(images)
      } else { // 이미지가 하나인 경우
        const image = await Image.create({ src: req.body.image })
        await post.addImage(image)
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image,
      }, {
        model: Comment,
      }, {
        model: User, // 게시글 작성자
        attributes: ['id', 'nickname']
      }, {
        model: User, // 게시글 작성자
        as: 'Liker',
        attributes: ['id']
      }]
    })

    res.status(201).json(fullPost); // 201: 데이터 생성 성공
  } catch(err) {
    console.error(err);
    next(err);
  }
})

router.post('/images', needLogin, upload.array('image'), async (req, res, next) => {
  // image라는 키값을 가진 array의 형태로 업로드 해야함
  // upload.array('image') => array 형식으로 실제 파일을 업로드하는 것이기 때문에 key값으로 image를 사용함
  console.log(req.files)
  res.status(201).json(req.files.map((v) => v.filename));
});

router.post('/:postId/retweet', needLogin, async (req, res, next) => {
  try{
    const post = await Post.findOne({
      where: { id: req.params.postId},
      include: [{
        model: Post,
        as: 'Retweet',
      }]
    });
    if(!post){
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    if(req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)){
      return res.status(403).send('자신의 글은 리트윗할 수 없습니다.')
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      }
    })
    if(exPost){
      return res.status(403).send('이미 리트윗하셨습니다.')
    }
    const retweet = await Post.create({
      UserId: req.user.id,
      content: 'retweet',
      RetweetId: retweetTargetId,
    })
    const retweetWithPost = await Post.findOne({
      where: { id: retweet.id },
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
        model: User, // 내 정보
        attributes: ['id', 'nickname']
      }, {
        model: Image, // 내 게시글 이미지
      }, {
        model: Comment, // 내 게시글 댓글
        include: [{
          model: User, // 댓글 작성자
          attributes: ['id', 'nickname'],
        }]
      }, {
        model: User, // 내 리트윗 좋아요 누른 사람
        as: 'Liker',
        attributes: ['id']
      }]
    })
    res.status(201).json(retweetWithPost); // 201: 데이터 생성 성공
  } catch(err) {
    console.error(err);
    next(err);
  }
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
        attributes: ['id', 'nickname']
      }]
    })

    res.status(201).json(fullComment); // 201: 데이터 생성 성공
  } catch(err) {
    console.error(err);
    next(err);
  }
})

router.patch('/:postId/like', needLogin, async (req, res, next) => { // PATCH /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId }});
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLiker(req.user.id);
    res.status(201).json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId/unlike', needLogin, async (req, res, next) => { // DELETE /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId }});
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLiker(req.user.id);
    res.status(201).json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId', needLogin, async (req, res, next) => { // DELETE /post/1/like
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      }
    })
    res.status(200).json({ PostId: parseInt(req.params.postId) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
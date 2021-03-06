const DataTypes = require('sequelize');

module.exports = class Post extends DataTypes.Model {
  static init(sequelize) {
    return super.init({
      // id <- default
      content: {
        type: DataTypes.TEXT, // 무제한
        allowNull: false, // 필수
        // UserId: 1
      },
    }, {
      modelName: 'Post',
      tableName: 'posts',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', // 한글설정 + 이모티콘 설정
      sequelize,
    })
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
    // post.addUser, post.getUser, post.removeUser 가 자동 생성됨
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Liker' }); // 좋아요!, Liker로 표시
    // post.addLiker, post.getLiker, post.removeLiker 가 자동 생성됨
    db.Post.hasMany(db.Comment);
    // post.addComments, post.getComments, post.removeComments 가 자동 생성됨
    db.Post.hasMany(db.Image);
    // post.addImages, post.getImages, post.removeImages 가 자동 생성됨
    db.Post.belongsToMany(db.Hashtag, { through: "HashtagList" })
    // post.addHashtags, post.getHashtags, post.removeHashtags 가 자동 생성됨
    db.Post.belongsTo(db.Post, { as: 'Retweet' });
    // post.addRetweet, post.getRetweet, post.removeRetweet 가 자동 생성됨  
  }
}
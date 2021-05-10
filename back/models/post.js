module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    // id <- default
    content: {
      type: DataTypes.TEXT, // 무제한
      allowNull: false, // 필수
      // UserId: 1
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 한글설정 + 이모티콘 설정
  });
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Liker' }); // 좋아요!, Liker로 표시
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag, { through: "HashtagList" })
    db.Post.hasMany(db.Post, { as: 'Retweet' });
  };
  return Post;
}
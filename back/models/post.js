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
    db.POST.belongsTo(db.User);
    db.POST.belongsToMany(db.User, { through: 'Like', as: 'Liker' }); // 좋아요!, Liker로 표시
    db.POST.hasMany(db.Comment);
    db.POST.hasMany(db.Image);
    db.POST.belongsToMany(db.Hashtag)
    db.POST.hasMany(db.Post, {through: 'Retweet'});
  };
  return Post;
}
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    // id <- default
    content: {},
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 한글설정 + 이모티콘 설정
  });
  Post.associate = (db) => {};
  return Post;
}
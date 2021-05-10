module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    // id <- default
    content: {
      type: DataTypes.TEXT, // 무제한
      allowNull: false, // 필수
      // UserId: 1
      // PostId: 1
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 한글설정 + 이모티콘 설정
  });
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
}
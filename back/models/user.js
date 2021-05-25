const DataTypes = require('sequelize');

module.exports = class User extends DataTypes.Model {
  static init(sequelize) {
    return super.init({
      // id <- default
      email: {
        // STRING, INTEGER, FLOAT, TEXT, DATETIME, BOOLEAN, 
        type: DataTypes.STRING(40),
        allowNull: false, // required
        unique: true, // 고유값
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false, // required
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, // required
      },
    }, {
      modelName: 'User',
      tableName: 'users',
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글설정
      sequelize,
    })
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); // 좋아요!, Liked로 표시
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: "FollowingId" }); // 팔로우!, Follower로 표시
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: "FollowerId" }); // 팔로우!, Following으로 표시
  }
}
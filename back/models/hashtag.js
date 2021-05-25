const DataTypes = require('sequelize');

module.exports = class Hashtag extends DataTypes.Model {
  static init(sequelize) {
    return super.init({
      // id <- default
      name: {
        type: DataTypes.STRING(20), // 무제한
        allowNull: false, // 필수
      },
    }, {
      modelName: 'Hashtag',
      tableName: 'hashtags',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', // 한글설정 + 이모티콘 설정
      sequelize,
    })
  }

  static associate(db) {
    db.Hashtag.belongsToMany(db.Post, { through: "HashtagList" })
  }
}
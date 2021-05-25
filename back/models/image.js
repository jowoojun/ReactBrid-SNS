const DataTypes = require('sequelize');

module.exports = class Image extends DataTypes.Model {
  static init(sequelize) {
    return super.init({
      // id <- default
      src: {
        type: DataTypes.STRING(200), // 무제한
        allowNull: false, // 필수
      },
      // PostId: 1
    }, {
      modelName: 'Image',
      tableName: 'images',
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글설정 + 이모티콘 설정
      sequelize,
    })
  }

  static associate(db) {
    db.Image.belongsTo(db.Post);
  }
}
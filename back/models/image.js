module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    // id <- default
    src: {
      type: DataTypes.STRING(200), // 무제한
      allowNull: false, // 필수
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글설정 + 이모티콘 설정
  });
  Image.associate = (db) => {};
  return Image;
}
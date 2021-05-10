module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Hashtag', {
    // id <- default
    name: {
      type: DataTypes.STRING(20), // 무제한
      allowNull: false, // 필수
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 한글설정 + 이모티콘 설정
  });
  Hashtag.associate = (db) => {};
  return Hashtag;
}
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글설정
  });
  User.associate = (db) => {};
  return User;
}
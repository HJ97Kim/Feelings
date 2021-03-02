module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // MySQL에는 users 테이블 생성
    // id가 기본적으로 들어가있음
    email: {
      type: DataTypes.STRING(30),
      allowNull: false, // 필수
      unique: true, // 고유한 값
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false, // 필수
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false, // 필수
    },
    img: {
      type: DataTypes.STRING(200),
      allowNull: true, // 필수 X
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글 저장
  });
  User.associate = (db) => {
    db.User.hasMany(db.Post);
  };
  return User;
}
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { // MySQL에는 posts 테이블 생성
    // id가 기본적으로 들어가있음
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING(30),
      allowNull: false, // 필수
    },
    feeling: {
      type: DataTypes.STRING(10),
      allowNull: false, // 필수
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 이모티콘 저장
  });
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
  };
  return Post;
}
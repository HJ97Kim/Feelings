const express = require('express');
const cors = require('cors');

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');

const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

app.use(cors({
  origin: '*'
}));
// front에서 보낸 req.body를 data에 넣어주는 역할
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// req: 프론트에서 보내온 요청정보 res: 응답정보
app.get('/', (req, res) => {
  res.send('hello api');
});

app.get('/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello' },
    { id: 2, content: 'hello2' },
    { id: 3, content: 'hello3' },
  ]);
});

app.use('/post', postRouter); // post가 붙음
app.use('/user', userRouter); // user가 붙음

app.listen(3065, () => {
  console.log('서버 실행 중');
});
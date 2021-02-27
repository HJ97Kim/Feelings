const express = require('express');
const postRouter = require('./routes/post');

const app = express();
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

app.listen(3065, () => {
  console.log('서버 실행 중');
});
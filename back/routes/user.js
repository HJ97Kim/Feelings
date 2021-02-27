const express = require('express');
const bcrypt = require('bcrypt'); // 비밀번호 암호화 라이브러리
const { User } = require('../models'); // db.User

const router = express.Router();
// await 쓰려면 async 함수로 만들어야함
router.post('/', async (req, res, next) => { // POST /user/
  // nickname 과 img는 firstSetting 에서 해줄거임
  try {
    const exUser = await User.findOne({ // 이메일 중복 체크 없으면 null
      where: {
        email: req.body.email,
      }
    });
    if (exUser) { // 이메일 중복일 경우
      return res.status(403).send('이미 사용중인 아이디입니다.'); // 400 클라이언트 에러
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 바밀번호 암호화 숫자가 높을수록 보안 올라감
    await User.create({
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).send('ok'); // 200 성공
  } catch (error) {
    console.error(error);
    next(error); // status 500 서버 에러
  }
});

module.exports = router;
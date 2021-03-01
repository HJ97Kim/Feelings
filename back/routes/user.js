const express = require('express');
const bcrypt = require('bcrypt'); // 비밀번호 암호화 라이브러리
const passport = require('passport');
const fs = require('fs');

const { User, Post } = require('../models'); // db.User
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더 없으므로 생성!');
  fs.mkdirSync('uploads');
}

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
        }]
      })
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
        }]
      })
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

// await 쓰려면 async 함수로 만들어야함
router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user/
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


router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update({
      nickname: req.body.nickname,
    }, {
      where: { id: req.user.id },
    });
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
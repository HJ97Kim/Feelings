const express = require('express');

const router = express.Router();
// req: 프론트에서 보내온 요청정보 res: 응답정보
router.post('/', (req, res) => { // POST /post
  res.json({ id: 1, content: 'hello' });
});

router.delete('/', (req, res) => { // DELETE /post
  res.json({ id: 1 });
});

module.exports = router;
var express = require('express');
const dbcp=require('../db/db');
var router = express.Router();

/* GET home page. */
router.get('login', async function(req, res, next) {
  res.render('index');
});

router.post('login', async(req, res)=>{
  const {userId, password} = req.body;
  let result='';

  const conn=await dbcp.getConnection();
  const rows = await conn.query('select id, password from user where id=?',[userId])//?표에 들어갈 것은 다음 명령어? 배열에서 알려줌
  conn.end();

  if(rows.length==0){
    result='등록되지 않은 사용자 입니다.';
  }
  else {
    const db_user=rows[0];
    if(db_user.user_password==password){
      result='반갑습니다.';
      req.session.userId=userId;//req.session.는 정해져 있는 것, userId부분은 내가 정하는 것(변수 하나 지정, 변수 호출)
      res.redirect('/');
      return;
    }
    else
      result='비밀번호 오류입니다.';
  }
 
  res.render('index', {result:result});
});

module.exports = router;
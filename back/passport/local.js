const passport = require('passport');
const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try{
      const user = await User.findOne({
        where: { email }
      });
      if(!user){
        return done(null, false, { reason: '존재하지 않는 사용자입니다.' }) // 실패
      }
      const result = await bcrypt.compare(password, user.password)
      if(result){
        return done(null, user) // 성공
      }
      return done(null, false, { reason: '비밀번호가 틀렸습니다.' }) // 실패
    } catch(err) {
      console.error(err);
      return done(err)
    }
    // done 사용 예시.. done(백엔드 서버 에러, 성공할 경우 돌려줄 것, 클라이언트 서버 에러)
  }));
}
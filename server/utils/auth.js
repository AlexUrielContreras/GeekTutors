const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function (token) {
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      return data
    } catch {
      console.log('Invalid token');
      return false
    }
  },
  signToken: function ({ firstName, email, _id }) {
    const payload = { firstName, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
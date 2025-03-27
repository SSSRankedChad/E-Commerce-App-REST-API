const createError = require('http-errors');
const userModel = require('../models/user.js');
const userModelInstance = new userModel();

module.exports = class AuthService {
  async register (data) {
    const { email } = data;

    try {
      const user = userModelInstance(email);

      if (user) {
        return createError(409, 'User already exists');
      }

      return userModelInstance.create(data);
    } catch (err) {
      throw createError(500, err);
    }
  }

  async login(data) {
   try {

    const {email, password } = data;

    const user = userModelInstance.findUserByEmail(email);

    if (!user) {
      return createError(401, 'User cannot be found')
    }

    if(user.password !== password ) {
      return createError(409, 'Incorrect password or email');
    }

    return user
   } catch(err) {
     throw createError(500, err);
   }
  }
}

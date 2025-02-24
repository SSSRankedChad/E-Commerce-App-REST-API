const createError = require('http-errors');
const userModel = require('../components/user.js');
const UserModelInstance = new userModel();


module.exports = class UserServices {

  async get(data) {
    try {
      const { id } = data;

      const user = UserModelInstance.findbyUserId(id);

      if (!user) {
        throw createError(409, 'User not found');
      }

      return user;
    } catch (err) {
      throw err;
    }
  }

  async update(data) {
    try {
      const {id} = data;

      const user = UserModelInstance.updateUser(id);

      return user;
    } catch (err) {
      throw err;
    }
  }
}

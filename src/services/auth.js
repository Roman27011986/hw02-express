const UsersRepository = require('../repository/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
  }

  async login({ email, password }) {
    const user = await this.repositories.users.findByEmail(email);
    if (!user || !(await user.validPassword(password))) {
      return { token: null };
    }
    const id = user.id;
    const payload = { id };
    //Создали токен
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    //Зачем мы обновляем только что созданный токен???
    await this.repositories.users.updateToken(id, token);
    //Зачем мы возвращаем токен???
    //Почему не возвращаем токен при регистрации???
    return { token, user };
  }

  async logout(id) {
    const data = await this.repositories.users.updateToken(id, null);
    return data;
  }
}

module.exports = AuthService;

const User = require('../schemas/user');

class UsersRepository {
  constructor() {
    this.model = User;
  }

  async findById(id) {
    const result = await this.model.findOne({ _id: id });
    return result;
  }

  async findByEmail(email) {
    const result = await this.model.findOne({ email });
    return result;
  }

  async createUser(body) {
    const user = new this.model(body);
    return user.save();
  }
  //не лучше ли вынести обновление токена куданибудь например репозиторий аунтификации???
  async updateToken(id, token) {
    await this.model.updateOne({ _id: id }, { token });
  }
}

module.exports = UsersRepository;

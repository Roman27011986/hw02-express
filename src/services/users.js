const UsersRepository = require('../repository/users');
const EmailService = require('./email');
const { errorHandler } = require('../helpers/errorHandler');
const { nanoid } = required('nanoid');

class UserService {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
    this.emailService = new EmailService();
  }

  async createUser(body) {
    const verifyToken = nanoid();
    const { email, name } = body;
    try {
      await this.emailService.sendEmail(verifyToken, email, name);
    } catch (error) {
      throw new errorHandler(503, error.message, 'Service Unavailable');
    }
    const data = await this.repositories.users.createUser({ ...body, verifyToken });
    return data;
  }

  async findByEmail(email) {
    const data = await this.repositories.users.findByEmail(email);
    return data;
  }
  async findById(id) {
    const data = await this.repositories.users.findById(id);
    return data;
  }

  async patchAvatar(id, newUrl) {
    const data = await this.repositories.users.updateAvatar(id, newUrl);
    return data;
  }

  async verify({ token }) {
    const user = await this.repositories.users.findByField({ verifyToken: token });
    if (user) {
      return true;
    }
    await user.updateOne({ verify: true, verifyToken: null });
    return false;
  }
}

module.exports = UserService;

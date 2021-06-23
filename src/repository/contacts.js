const Contact = require('../schemas/conatacts');

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }

  async getContacts(uid) {
    const listContacts = await this.model.find({ owner: uid });
    return listContacts;
  }
  async getById(id) {
    const result = await this.model.findOne({ _id: id });
    return result;
  }

  async addContact(body, uid) {
    const result = await this.model.create({ ...body, owner: uid });
    return result;
  }
  async removeContact(id) {
    const result = await this.model.findByIdAndRemove({ _id: id });
    return result;
  }
  async updateContact(id, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true },
    );
    return result;
  }

  async patchContact(id, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true },
    );
    return result;
  }
}

module.exports = ContactsRepository;

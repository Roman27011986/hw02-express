const Contact = require('../schemas/conatacts');

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }

  async getContacts(uid) {
    const listContacts = await this.model.find({ owner: uid });
    return listContacts;
  }
  async getById(uid, id) {
    const result = await this.model.findOne({ _id: id, owner: uid });
    return result;
  }

  async addContact(uid, body) {
    const result = await this.model.create({ ...body, owner: uid });
    return result;
  }
  async removeContact(uid, id) {
    const result = await this.model.findOneAndDelete({ _id: id, owner: uid });

    return result;
  }
  async updateContact(uid, id, body) {
    const result = await this.model.findOneAndUpdate(
      { _id: id },
      { owner: uid },
      { ...body },
      { new: true },
    );
    return result;
  }

  async patchContact(uid, id, body) {
    const result = await this.model.findOneAndUpdate(
      { _id: id },
      { owner: uid },
      { ...body },
      { new: true },
    );
    return result;
  }
}

module.exports = ContactsRepository;

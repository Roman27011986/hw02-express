const ContactsRepository = require('../repository/contacts');

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepository(),
    };
  }

  async getContacts(uid) {
    const data = await this.repositories.contacts.getContacts(uid);
    return data;
  }

  async getById(uid, id) {
    const contact = await this.repositories.contacts.getById(uid, id);
    return contact;
  }

  async addContact(uid, body) {
    const contact = await this.repositories.contacts.addContact(uid, body);
    return contact;
  }

  async removeContact(uid, id) {
    const result = await this.repositories.contacts.removeContact(uid, id);
    return result;
  }

  async updateContact(uid, id, body) {
    const result = await this.repositories.contacts.updateContact(uid, id, body);
    return result;
  }

  async patchContact(uid, id, body) {
    const result = await this.repositories.contacts.patchContact(uid, id, body);
    return result;
  }
}

module.exports = ContactsService;

const ContactsRepository = require('../repository/contacts');

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepository(),
    };
  }

  async getContacts() {
    const data = await this.repositories.contacts.getContacts();
    return data;
  }

  async getById(id) {
    const contact = await this.repositories.contacts.getById(id);
    return contact;
  }

  async addContact(body, uid) {
    const contact = await this.repositories.contacts.addContact(body, uid);
    return contact;
  }

  async removeContact(id) {
    const result = await this.repositories.contacts.removeContact(id);
    return result;
  }

  async updateContact(id, body) {
    const result = await this.repositories.contacts.updateContact(id, body);
    return result;
  }

  async patchContact(id, body) {
    const result = await this.repositories.contacts.patchContact(id, body);
    return result;
  }
}

module.exports = ContactsService;

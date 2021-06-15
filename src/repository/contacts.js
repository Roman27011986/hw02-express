const { ObjectID } = require('mongodb');
const { ErrorHandler } = require('../helpers/errorHandler');

class ContactsRepository {
  constructor(client) {
    this.collection = client.db().collection('contacts');
  }

  #getMongoId(id) {
    try {
      return ObjectID(id);
    } catch (error) {
      throw new ErrorHandler('400', `MongoDb _id: ${error.message}`, 'Bad Request');
    }
  }

  async getContacts() {
    const listContacts = await this.collection.find({}).toArray();
    return listContacts;
  }
  async getById(id) {
    const objectId = this.#getMongoId(id);
    const result = await this.collection.find({ _id: objectId }).toArray();
    return result;
  }

  async addContact(body) {
    const {
      ops: [result],
    } = await this.collection.insertOne(body);
    return result;
  }
  async removeContact(id) {
    const objectId = this.#getMongoId(id);
    const { value: result } = await this.collection.findOneAndDelete({ _id: objectId });
    return result;
  }
  async updateContact(id, body) {
    const objectId = this.#getMongoId(id);
    const { value: result } = await this.collection.findOneAndUpdate(
      { _id: objectId },
      { $set: body },
      { returnDocument: 'after' },
    );
    return result;
  }
}

module.exports = ContactsRepository;

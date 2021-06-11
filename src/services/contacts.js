const fs = require('fs/promises')
const path = require('path')
const { v4: uuid } = require('uuid')
const contactsPath = path.normalize('./data/contacts.json')

class ContactsService {
  async getContacts() {
    const contacts = await fs.readFile(contactsPath, 'utf8')
    return JSON.parse(contacts)
   }

    getAll() {
        return this.getContacts()
    }

   async getById(id) {
        const listContacts = await this.getContacts()
        return listContacts.find(element => element.id == id)
    }
    
   async removeContact(id) {
        const listContacts = await this.getContacts()
        const filtredContacts = listContacts.filter(element => element.id !== Number(id))
        if (listContacts.length === filtredContacts.length) {
            return null
        }
        await fs.writeFile(contactsPath, JSON.stringify(filtredContacts, null, ' '))
        return filtredContacts
    }

   async addContact(body) {
        const contacts = await this.getContacts()
        const contact = {
            id: uuid(),
            ...body
          }
        await fs.writeFile(contactsPath, JSON.stringify([contact, ...contacts], null, ' '))
        return contact
    }

   async updateContact(id,body){
    const listContacts = await this.getContacts()
    const contact = listContacts.find(element => element.id == id)
    if (!contact) {
        return null
    }
    const oldContacts = listContacts.filter(element => element.id != id)
    const updContact = {
        ...contact,
        ...body
      }
      await fs.writeFile(contactsPath, JSON.stringify([updContact, ...oldContacts], null, ' '))
      return updContact
    }
}

module.exports = ContactsService
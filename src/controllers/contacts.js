const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.normalize('./data/contacts.json')
const ContactsService = require('../services/contacts')
const contactsService = new ContactsService()

const listContacts = async (req, res, next) => {
  try {
    const listContacts = await contactsService.getAll()
    res.status(200).json({
      message: 'success',
      status: '200',
      listContacts
    })
  } catch (error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const contact = await contactsService.getById(req.params.contactId)
    if (!contact) {
      res.status(404).json({
        message: 'Not found',
        status: '404',
      })
    }
    res.status(200).json({
      message: 'success',
      status: '200',
      contact
    })
  } catch (error) {
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  try {
    if (!await contactsService.removeContact(req.params.contactId)) {
      res.status(404).json({
        message: 'not found',
        status: '404'
      })
      return
    }
    res.status(200).json({
      message: 'contact deleted',
      status: 'success'
    })
  } catch (error) {
    next(error)
  }
}

const addContact = async (req, res, next) => {
try {
  const contact = await contactsService.addContact(req.body)
  res.status(201).json({
    status:'201',
    contact
  })
} catch (error) {
  next(error)
}
}

const updateContact = async (req, res, next) => {
  try {
    const {name, email, phone} = req.body
    if (name || email || phone) {
      const updateContact = await contactsService.updateContact(req.params.contactId, req.body)
      return updateContact ? 
      res.status(200).json({
        message: 'success',
        status: '200',
        updateContact
      })
      :
      res.status(200).json({
        message: 'Not found',
        status: '404',
      })
    }
    return res.status(400).json({
      message:'missing fields',
      status:'400'
     })
  } catch (error) {
    next(error)
  }
  
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

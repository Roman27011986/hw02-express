const express = require('express');
const { 
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../controllers/contacts');
const {
  validateAddContac,
  validateUpdateContact
} = require('../validation/contacts');
const router = express.Router();

router.get('/', listContacts)

router.get('/:contactId', getContactById)

router.post('/', validateAddContac, addContact)

router.delete('/:contactId', removeContact)

router.put('/:contactId', validateUpdateContact, updateContact)

module.exports = router

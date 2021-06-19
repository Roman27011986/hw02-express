const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  patchContact,
} = require('../controllers/contacts');
const {
  validateAddContac,
  validateUpdateContact,
  validatePatchContact,
} = require('../validation/contacts');
const router = express.Router();

router.get('/', listContacts);

router.get('/:contactId', getContactById);

router.post('/', validateAddContac, addContact);

router.delete('/:contactId', removeContact);

router.put('/:contactId', validateUpdateContact, updateContact);

router.patch('/:contactId', validatePatchContact, patchContact);

module.exports = router;

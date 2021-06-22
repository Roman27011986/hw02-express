const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  patchContact,
} = require('../../controllers/contacts');
const {
  validateAddContac,
  validateUpdateContact,
  validatePatchContact,
} = require('../../validation/contacts');
const router = express.Router();
//Блогодоря gurd незалогиненый пользователь несможет получить доступ к контактам...
const guard = require('../../helpers/guard');

router.get('/', guard, listContacts);

router.get('/:contactId', guard, getContactById);

router.post('/', guard, validateAddContac, addContact);

router.delete('/:contactId', guard, removeContact);

router.put('/:contactId', guard, validateUpdateContact, updateContact);

router.patch('/:contactId', guard, validatePatchContact, patchContact);

module.exports = router;

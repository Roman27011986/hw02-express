const ContactsService = require('../services/contacts');
const contactsService = new ContactsService();

const listContacts = async (req, res, next) => {
  try {
    const listContacts = await contactsService.getContacts();
    res.status(200).json({
      message: 'success',
      status: '200',
      listContacts,
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contact = await contactsService.getById(req.params.contactId);
    if (contact.length === 0) {
      return next({
        status: '404',
        message: 'Not found',
      });
    }
    res.status(200).json({
      message: 'success',
      status: '200',
      contact,
    });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = await contactsService.addContact(req.body);
    res.status(201).json({
      status: '201',
      contact,
    });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contacts = await contactsService.removeContact(req.params.contactId);
    if (!contacts) {
      return next({
        status: '404',
        message: 'Not found',
      });
    }
    res.status(200).json({
      message: 'contact deleted',
      status: 'success',
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const updateContact = await contactsService.updateContact(
      req.params.contactId,
      req.body,
    );
    return res.status(200).json({
      message: 'success',
      status: '200',
      updateContact,
    });
  } catch (error) {
    next({ message: 'Not found', status: '404' });
  }
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

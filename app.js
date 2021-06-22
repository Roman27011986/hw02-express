const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./src/api/contacts/contacts');
const usersRouter = require('./src/api/users/users');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : '500';
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message.replace(/"/g, ''),
    data: err.status === 500 ? 'Iternal Server Error' : err.data,
  });
});

module.exports = app;

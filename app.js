const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./src/api/contacts/contacts');
const usersRouter = require('./src/api/users/users');
//----------------------------
// const multer = require('multer');
const path = require('path');
// const jimp = require('jimp');
// const fs = require('fs').promises;
// require('dotenv').config();
//----------------------------
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

//----------------------------------------------------------------------------

// const UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR);
// const IMG_DIR = path.join(__dirname, 'public', 'avatars');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, UPLOAD_DIR);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 2000000 },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.includes('image')) {
//       cb(null, true);
//       return;
//     }

//     cb(null, false);
//   },
// });
app.use(express.static(path.join(__dirname, 'public')));

// app.post('/upload', upload.single('avatar'), async (req, res, next) => {
//   if (req.file) {
//     const img = await jimp.read(req.file.path);
//     await img
//       .autocrop()
//       .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
//       .writeAsync(req.file.path);
//     await fs.rename(req.file.path, path.join(IMG_DIR, req.file.originalname));
//   }
//   res.redirect('/');
// });

//------------------------------------------------------------------

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

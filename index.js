const app = require('./app');
const db = require('./db/index');
const fs = require('fs').promises;
const path = require('path');
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);
const PORT = process.env.PORT || 3000;

const isAccessible = path => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsExist = async folder => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};
db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIsExist(UPLOAD_DIR);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch(err => {
  console.log(`Server not running. Error message: ${err.message}`);
});

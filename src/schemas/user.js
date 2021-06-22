const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const SALT_FACTOR = 6;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate(value) {
        const regular = /\S+@\S+\.\S+/;
        return regular.test(String(value).toLowerCase());
      },
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
      message: 'This subscription is not definde',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);
//солим пароль перед сохранением в базу
userSchema.pre('save', async function (next) {
  //избегаем зацикливания
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(SALT_FACTOR));
  next();
});
//сравниваем пароль при логине
userSchema.methods.validPassword = async function (password) {
  const res = await bcrypt.compare(password, this.password);
  console.log('res', res);
  return res;
};

const User = mongoose.model('user', userSchema);

module.exports = User;

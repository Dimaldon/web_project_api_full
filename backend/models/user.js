import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlenght: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlenght: 30,
    default: 'Explorador',
  },
  avatar: {
    type: String,
    default:
      'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator(value) {
        const regex =
          /^(https?:\/\/)?([\da-z.-]+\.[a-z.]{2,6}|[\d.]+)([/:?=&#]{1}[\da-z.-]+)*[/?]?$/;
        return regex.test(value);
      },
      message: (props) => `${props.value} no es una URL válida!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        const urlRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
        return urlRegex.test(value);
      },
      message: (props) => `${props.value} no es un email válido!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Correo o contraseña incorrecta'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Correo o contraseña incorrecta'));
        }
        return user;
      });
    });
};

const User = mongoose.model('user', userSchema);

export default User;

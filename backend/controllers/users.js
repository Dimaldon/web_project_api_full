import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const { NODE_ENV, JWT_SECRET } = process.env;

export const getUsers = async (req, res, next) => {
  try {
    const usersList = await User.find();
    return res.send(usersList);
  } catch (err) {
    return next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const getUser = await User.findById(userId).orFail();
    return res.send(getUser);
  } catch (err) {
    return next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    bcrypt
      .hash(password, 10)
      .then((hash) => User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }))
      .then((user) => res.send(user));
  } catch (err) {
    return next(err);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          {
            expiresIn: '7d',
          },
        ),
      });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true },
    ).orFail();
    return res.send(updatedUser);
  } catch (err) {
    return next(err);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const updatedAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true },
    ).orFail();
    return res.send(updatedAvatar);
  } catch (err) {
    return next(err);
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

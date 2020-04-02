const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const NotFoundError = require('../errors/index');
const Error500 = require('../errors/error-server');

const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, email, password } = req.body;
  if (password.length > 8) {
    bcrypt.hash(password, 8)
      .then((hash) => User.create({
        name, email, password: hash,
      }))
      .then(() => res.send({ data: { name, email } }))
      .catch(() => res.status(500).send({ message: 'Не удалось создать пользователя' }));
  } else { throw new Error500('Слишком короткий пароль!'); }
};

module.exports.getUser = (req, res) => {
  User.findById(req.user._id)
    .then((userId) => {
      if (!userId) {
        throw new NotFoundError('Такого пользователя нет');
      } else {
        res.send({ userId });
      }
    })
    .catch(() => res.status(500).send({ message: 'Нет пользователя с таким id' }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.status(200).cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      })
        .send(token)
        .end();
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

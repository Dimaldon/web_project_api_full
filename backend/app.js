/* eslint-disable no-console */
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { celebrate, Joi, errors } from 'celebrate';
import users from './routes/users.js';
import cards from './routes/cards.js';
import { createUser, login } from './controllers/users.js';
import auth from './middlewares/auth.js';
import { requestLogger, errorLogger } from './middlewares/loggers.js';

const { PORT = 4000 } = process.env;

// conectar con el servidor MongoDB
mongoose
  .connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('Conected to database');
  })
  .catch((err) => {
    console.log(`error connecting to the database ${err}`);
  });

// Configurar prefijos para las rutas
const app = express();
app.use(express.json());

app.use(cors());
app.options('*', cors());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

// estas dos rutas no necesitan nuestro middleware de autorización
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      about: Joi.string().required(),
      avatar: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

// autorización
app.use(auth);

// estas rutas necesitan autorización
app.use('/users', users);
app.use('/cards', cards);

app.use(errorLogger);

app.use(errors());

// Manejar errores del servidor
app.get('/', (req, res) => {
  res.status(500).send({ message: 'An error has ocurred on the server' });
});

app.use((err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({
      message:
        'Se pasaron datos inválidos a los métodos para crear un usuario/tarjeta o actualizar el avatar/perfil de un usuario.',
    });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(404).send({
      message:
        'No existe un usuario con el id solicitado o la solicitud se envió a una dirección inexistente;',
    });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).send({
      message: 'Se pasaron datos incorrectos;',
    });
  }
  if (err.code === 11000) {
    return res.status(409).send({
      message:
        'Al registrarse, se especificó un correo electrónico que ya existe en el servidor',
    });
  }
  console.log(err);
  res.status(500).send({ message: 'Se ha producido un error en el servidor' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});

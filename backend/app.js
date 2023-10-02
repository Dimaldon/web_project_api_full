/* eslint-disable no-console */
import express from 'express';
import mongoose from 'mongoose';
import users from './routes/users.js';
import cards from './routes/cards.js';
import { createUser, login } from './controllers/users.js';
import { auth } from './middlewares/auth.js';

const { PORT = 3000 } = process.env;

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

// estas dos rutas no necesitan nuestro middleware de autorización
app.post('/signup', createUser);
app.post('/signin', login);

// autorización
app.use(auth);

// estas rutas necesitan autorización
app.use('/users', users);
app.use('/cards', cards);

// Manejar errores del servidor
app.get('/', (req, res) => {
  res.status(500).send({ message: 'An error has ocurred on the server' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});

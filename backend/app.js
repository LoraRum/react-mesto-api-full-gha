require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const BodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { validateLogin, validateCreateUser } = require('./middlewares/validation');
const { BadRequest, NotFound } = require('./errors/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;
const db = mongoose.connection;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', console.info.bind(console, 'Connected to MongoDB'));

db.once('open', () => {
  const app = express();
  app.use(cookieParser());

  app.use(express.json());
  app.use(BodyParser.json());
  app.use(cors());

  app.all(['/users*', '/cards*'], auth);

  app.use(requestLogger);

  app.get('/crash-test', () => {
    setTimeout(() => {
      throw new Error('Сервер сейчас упадёт');
    }, 0);
  });

  app.post('/signin', validateLogin, login);
  app.post('/signup', validateCreateUser, createUser);

  app.use('/users', users);
  app.use('/cards', cards);

  app.use((req, res, next) => {
    next(new NotFound('Route not found'));
  });

  app.use(errorLogger);
  app.use(errors());

  app.use((err, req, res, next) => {
    if (err.name === 'CastError') {
      next(new BadRequest());
    }

    next(err);
  });

  app.use((err, req, res, next) => {
    if (res.headersSent) {
      next(err);
    } else {
      res
        .status(err.statusCode || 500)
        .json({ message: err.message || 'Server Exception' });
    }
  });

  app.listen(PORT, (error) => {
    if (error) {
      console.error('Server failed to start:', error);
    } else {
      console.info('Server is running');
    }
  });
});

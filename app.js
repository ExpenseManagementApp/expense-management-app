const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const { handleError, ErrorHandler } = require('./helpers/error');
require('dotenv').config(); // settingup environment variables

// importing routes
const authRoute = require('./routes/auth');

const app = express();
app.use(express.json()); // json parser
app.use(express.static(path.join(__dirname, 'public'))); // serving static files
process.env.NODE_ENV === 'development' && app.use(morgan('dev')); // logging middleware

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Connecting to mongodb
mongoose.connect(
  process.env.DATABASE_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  (err) => {
    if (!err) {
      console.log(`[ SUCCESS ] DB connected! 😋`);
      return;
    }
    console.log(`[ FAILED ] couldn't connect to DB.`);
  }
);

// Registering routes
app.use('/api/v1', authRoute);

app.all('*', (req, res) => {
  throw new ErrorHandler(404, `The page you are looking for was not there.`);
});
app.use((err, req, res, next) => handleError(err, res));

// Starting server
const $PORT = process.env.PORT || 3000;
app.listen($PORT, () =>
  console.log(`[ SUCCESS ] Server is Listening on http://localhost:${$PORT} 🚀`)
);

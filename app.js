const express = require('express');
const mongoose = require('mongoose');
const dotENV = require('dotenv');
const path = require('path');
const PORT = process.env.PORT || 3000;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


const app = express();
dotENV.config();
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//MongoDB Connection
mongoose.connect(
    'mongodb://localhost/expensesData', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log('connect to DATABASE')
);


app.use('/', indexRouter);
app.use('/users', usersRouter);


app.listen(PORT, () => console.log('Server is start'));
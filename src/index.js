const express = require('express');
const path = require('path');
const lessMiddleware = require('less-middleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const config = require('./config/config'); // здесь порт и настройки для mongoDB

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Using LESS middleware (renders the new .css file in the same folder)
app.use(lessMiddleware( __dirname+'/public', {
//    compress: true,
//    debug: true
}));

// Set public folder (for images, styles etc...)
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());

app.use(require('./routes/default'));
// app.use(require('./routes/posts')); // маршруты сервера для постов

mongoose.connect(config.dbURL, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.connection
    .once('open', () => {
    console.log(`>>> Mongoose connected (${config.dbURL})`);
    app.listen(process.env.PORT || config.port,
        () => console.log(`>>> Server starts (port ${config.port})`))
    })
    .on('error', error => console.warn(error))

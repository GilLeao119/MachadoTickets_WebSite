var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const bodyparser = require("body-parser");



const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json')


var mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const authController = require('./controllers/authController');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

// If using MongoAtlas uncomment the next line and complete the link with your cluster
//mongoose.connect('mongodb+srv://YOUR_MONGO_ATLAS_LINK', {useNewUrlParser: true} )
mongoose.connect('mongodb://127.0.0.1:27017/test', {useNewUrlParser: true})
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


var indexRouter = require('./routes/index');
var admRouter = require('./routes/adm');
var eventsRouter = require('./routes/events');
var localRouter = require('./routes/local');
var storeRouter = require('./routes/store');
var loginRouter = require('./routes/auth');
var apiRouter = require('./routes/api');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

app.use(express.static("public"));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/adm', admRouter);
app.use('/events',eventsRouter);
app.use('/local',localRouter);
app.use('/store',storeRouter);
app.use('/login',loginRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/api', apiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

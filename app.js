var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser = require("body-parser");
var app = express();
var session = require('express-session')
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
})
app.set('trust proxy', 1) // trust first proxy
app.use(session({
        secret: 'tel4vn',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }))
    /* @@END VIEWS ENGINE */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
/* BODY_PARSER */
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '60mb', extended: true }))
const middleware = require('./middleware/middleware');
var contact = require('./routes/contact');
var contactapi = require('./routes/contactapi');
app.use('/', cookieParser(), indexRouter);
app.use('/contact', cookieParser(), contact);
// app.use('/users', middleware.auth, usersRouter);
// API
app.use('/api/contact', cookieParser(), contactapi);
// app.use('/api/contact', cookieParser(), middleware.permission, contactapi);
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
const port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log('App listening on port: ' + port);
});
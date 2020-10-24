var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const session = require('express-session');
var app = express();
app.use(session({
    secret: 'tel4vn',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 60000 }
}))
const middleware = require('./util/middleware/middleware')
var bodyParser = require("body-parser");
/* @@END VIEWS ENGINE */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', middleware.auth, usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err)
        // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/* BODY_PARSER */
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '60mb', extended: true }))
    /* END @@BODY_PARSER */
const port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('App listening on port: ' + port);
});
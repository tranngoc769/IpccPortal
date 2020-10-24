var express = require('express');
var router = express.Router();

const middleware = require('../util/middleware/middleware')
    /* GET home page. */
router.get('/', middleware.auth, function(req, res, next) {
    res.render('index', {
        title: 'Index',
        mess: 'Login success'
    });
});
router.get('/signin', function(req, res, next) {
    res.render('signin', { title: 'Express' });
});
router.post('/signin', function(req, res, next) {
    // logic here
    console.log("Test");
    var bodydata = req.body;
    console.log(bodydata);
    req.session.User = {
        username: 'tranngoc',
        something: 'something'
    }
    res.redirect('/');
})
module.exports = router;
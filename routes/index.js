var express = require('express');
const session = require('express-session');
var router = express.Router();
const userModel = require('../models/user')
const contactModel = require('../models/contact')
const sipModel = require('../models/sip')
const auth = require('../util/auth')
const middleware = require('../middleware/middleware')
const md5 = require('md5')


// 
/* GET home page. */
router.get('/', middleware.auth, async function(req, res, next) {
    const token = req.cookies.jwt;
    if (typeof token != "string" || token == 'undefined') {
        return res.redirect('signin');
    }
    const payload = await auth.verifyToken(token);
    const uid = 1;
    // const uid = payload.id;
    const sip = await sipModel.getSipAccountByUserId(uid);
    // Get list contact
    var totalContact = await contactModel.getAllContact();
    res.render('index', {
        totalContact: totalContact.length,
        allContact: totalContact,
        // 
        sip: sip
    });
});
router.get('/signin', function(req, res, next) {
    res.render('signin', { title: 'Express' });
});
router.post('/signin', async function(req, res, next) {
    var bodydata = req.body;
    var username = bodydata.username;
    var password = bodydata.password;
    var userRow = await userModel.getUserByName(username)
    if (userRow.length < 1) {
        return res.redirect('/signin');
    }
    var data = userRow[0];
    const payload = {
        username: data.username,
        email: data.email,
        uid: data.id
    };
    var hash_pass = md5(password)
    if (hash_pass == data.password) {
        const token = await auth.generateToken(payload);
        res.cookie('jwt', token);
        return res.redirect('/');
    } else {
        return res.redirect('/signin');
    }
});
module.exports = router;
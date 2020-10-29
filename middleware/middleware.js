var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../util/config');
const auth = require('../util/auth')
var checklogin = async function(req, res, next) {
    const token = req.cookies.jwt;
    if (typeof token == "string" && token != 'undefined') {
        const payload = await auth.verifyToken(token);
        if (!payload || !payload.username) {
            return res.redirect('./signin');
        }
        return next();
    }
    return res.redirect('./signin');
}

var permission = async function(req, res, next) {
    const token = req.cookies.jwt;
    if (typeof token == "string" && token != 'undefined') {
        const payload = await auth.verifyToken(token);
        if (!payload || !payload.username) {
            return res.json({ "code": 404, "msg": "Permission Deny" });
        }
        return next();
    }
    return res.json({ "code": 404, "msg": "Permission Deny" });
}
module.exports = {
    auth: checklogin,
    permission: permission
};
var express = require('express');
var router = express.Router();
const contactModel = require('../models/contact')
router.get('/', async function(req, res, next) {
    var qr = req.query;
    console.log(qr)
    if (typeof qr.number != 'undefined') {
        var data = await contactModel.getCountContactIncludeNmumber(qr.number);
        if (data.length < 1) {
            return res.json({ "code": 204, "msg": 'No number found' });
        }
        return res.json({ "code": 200, "msg": data[0] });
    }
    var data = await contactModel.getAllContact();
    return res.json({ "code": 200, "msg": { "data": data, "total": data.length } });
});

module.exports = router;
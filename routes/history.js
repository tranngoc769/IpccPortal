var express = require('express');
var router = express.Router();
const historyModel = require('../models/history')
router.post('/', async function(req, res, next) {
    var data = req.body;
    console.log(data);
    var result = await historyModel.insertHistory(data);
    if (result) {
        return res.send({ 'code': 200, 'msg': 'success' });
    }
    return res.send({ 'code': 403, 'msg': 'failed' });
});
module.exports = router;
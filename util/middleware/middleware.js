var checklogin = function(req, res, next) {

    try {
        var sess = req.session.User;
        if (typeof sess.username === "undefined" || sess.username == "") {
            res.redirect('./signin');

        } else {
            next();
        }
    } catch (error) {
        res.redirect('./signin');
    }
}
module.exports = {
    auth: checklogin
};
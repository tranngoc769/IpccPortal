// const mRole = require('../models/role');
const auth = require('../middleware/middleware');
module.exports = {
    // isAdmin: async(req, res, next) => {
    //     const token = req.cookies.jwt;
    //     //console.log(token);
    //     if (typeof token == "string") {
    //         const payload = await auth.verifyToken(token);
    //         ////console.log("Abc" + JSON.stringify(payload));
    //         const role = await mRole.getOnebyId(payload.roleID);
    //         if (role[0].byname == "admin") {
    //             next();
    //         } else {
    //             backURL = req.header('Referer') || '/';
    //             //console.log(backURL);
    //             res.redirect(backURL);
    //         }
    //     } else {
    //         backURL = req.header('Referer') || '/';
    //         //console.log(backURL);
    //         res.redirect(backURL);
    //         //res.redirect('/home');
    //     }
    // },
    // isSeller: async(req, res, next) => {
    //     const token = req.cookies.jwt;
    //     //console.log(token);
    //     if (typeof token == "string") {
    //         const payload = await auth.verifyToken(token);
    //         ////console.log("Abc" + JSON.stringify(payload));
    //         const role = await mRole.getOnebyId(payload.roleID);
    //         if (role[0].byname == "seller") {
    //             next();
    //         } else {
    //             //res.redirect('/home');
    //             backURL = req.header('Referer') || '/';
    //             //console.log(backURL);
    //             res.redirect(backURL);
    //         }
    //     } else {
    //         backURL = req.header('Referer') || '/';
    //         //console.log(backURL);
    //         res.redirect(backURL);
    //         //res.redirect('/home');
    //     }
    // },
};
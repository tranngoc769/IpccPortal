const fs = require('fs');
const jwt = require('jsonwebtoken');

// use 'utf8' to get string instead of byte array 
var privateKEY = fs.readFileSync('./private.key', 'utf8'); // to sign JWT
//console.log(privateKEY);
var publicKEY = fs.readFileSync('./public.key', 'utf8'); // to verify JWT
//console.log(publicKEY);
let generateToken = (payload) => {
    return new Promise((resolve, reject) => {
        // Th?c hi?n k� v� t?o token
        jwt.sign(
            payload,
            privateKEY, {
                algorithm: "RS256",
            },
            (error, token) => {
                if (error) {
                    return reject(error);
                }
                resolve(token);
            });
    });
}


let verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        const verifyOptions = {
            algorithms: ["RS256"]
        };
        jwt.verify(token, publicKEY, verifyOptions, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded);
        });
    });
}

//let generateToken =  (payload) => {

//    ////console.log(sql);
//    return jwt.sign( payload ,
//        privateKEY,
//        {
//            algorithm: "RS256",
//        })
//}
//let verifyToken = (token) => {
//    const verifyOptions = {
//        algorithms: ["RS256"]
//    };

//    var legit = jwt.verify(token, publicKEY, verifyOptions);
//    //console.log(legit);
//    //console.log("\nJWT verification result: " + JSON.stringify(legit));
//    return legit;
//}
module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
};
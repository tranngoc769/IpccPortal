const db = require('../util/db');
const tb = 'user';
module.exports = {
    getUserInfo: async(id) => {
        const sql = `SELECT  *
                     FROM ${tb} WHERE id= ${id}`;
        const rows = await db.load(sql);
        return JSON.parse(JSON.stringify(rows));
    },
    getUserByName: async(username) => {
        const sql = `SELECT  * FROM ${tb} WHERE username= '${username}'`;
        const rows = await db.query(sql);
        return JSON.parse(JSON.stringify(rows));
    }
};
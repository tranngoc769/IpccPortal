const db = require('../util/db');
const tb = 'user';
module.exports = {
    getAllUser: async(id) => {
        const sql = `SELECT  *
                     FROM ${tb} WHERE id= ${id}`;
        const rows = await db.query(sql);
        return JSON.parse(JSON.stringify(rows));
    },
    getUserByName: async(username) => {
        const sql = `SELECT  * FROM ${tb} WHERE username= '${username}'`;
        const rows = await db.query(sql);
        return JSON.parse(JSON.stringify(rows));
    },
    test: async(table, json) => {
        const sql = `SELECT  * FROM ${tb} WHERE username= '${username}'`;
        const rows = await db.query(sql);
        return JSON.parse(JSON.stringify(rows));
    }
};
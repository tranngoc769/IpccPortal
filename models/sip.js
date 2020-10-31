const db = require('../util/db');
const tb = 'sip';
module.exports = {
    getAllSipAccount: async(id) => {
        const sql = `SELECT  *
                     FROM ${tb}`;
        const rows = await db.query(sql);
        return JSON.parse(JSON.stringify(rows));
    },
    getSipAccountByUserId: async(uid) => {
        const sql = `SELECT  * FROM ${tb} WHERE userid= '${uid}'`;
        const rows = await db.query(sql);
        return JSON.parse(JSON.stringify(rows[0]));
    }
};
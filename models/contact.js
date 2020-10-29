const db = require('../util/db');
const tb = 'contact';
module.exports = {
    getAllContact: async(id) => {
        const sql = `SELECT  *
                     FROM ${tb}`;
        const rows = await db.query(sql);
        return JSON.parse(JSON.stringify(rows));
    },
    getContactById: async(id) => {
        const sql = `SELECT  * FROM ${tb} WHERE id= ${id}`;
        const rows = await db.query(sql);
        return JSON.parse(JSON.stringify(rows));
    },
    getCountContact: async() => {
        const sql = `SELECT  COUNT(id) AS number FROM ${tb}`;
        const rows = await db.query(sql);
        return JSON.parse(JSON.stringify(rows));
    },

    getCountContactIncludeNmumber: async(num) => {
        const sql = `SELECT * FROM ${tb} WHERE number LIKE '%${num}%' LIMIT 1`;
        const rows = await db.query(sql);
        return JSON.parse(JSON.stringify(rows));
    },

};
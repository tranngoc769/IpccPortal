const db = require('../util/db');
const tb = 'history';

function getComlumns(data) {
    var comlums = "";
    for (var att in data) {
        comlums += att + ","
    }
    comlums = comlums.substring(0, comlums.length - 1)
    return comlums;
}

function getComlumsValue(data) {
    var values = "";
    for (var att in data) {
        values += `'${data[`${att}`]}'` + ","
    }
    values = values.substring(0, values.length - 1)
    return values;
}

module.exports = {
    getAllHistory: async() => {
        const sql = `SELECT  *
                     FROM ${tb}`;
        const rows = await db.query(sql);
        return JSON.parse(JSON.stringify(rows));
    },
    getHistoryByUuid: async(uid) => {
        const sql = `SELECT  * FROM ${tb} WHERE uuid= '${uuid}'`;
        const rows = await db.query(sql);
        return JSON.parse(JSON.stringify(rows[0]));
    },
    insertHistory: async(json) => {
        let col = getComlumns(json);
        let val = getComlumsValue(json);
        const sql = `INSERT  INTO ${tb} (${col}) VALUES (${val})`;
        try {
            await db.query(sql);
            return true;
        } catch (e) {
            return false;
        }
    }

};
const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');


function listTodo(unaccomplishedOnly, searchText = '', start) {
    const where = [];
    if (searchText)
        where.push(`text ILIKE '%$1:value%'`);
    if (start)
        where.push('id < $2');
    if(unaccomplishedOnly==='true')
        where.push('"doneTs" IS NULL');

    const sql = `
        SELECT *
        FROM todos
        ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
        ORDER BY id DESC
        LIMIT 10
    `;
    return db.any(sql, [searchText, start]);
}
function createTodo(mood, text) {
    const t = moment().unix();

    const sql = `
        INSERT INTO todos (mood, text, ts)
        VALUES ($<mood>, $<text>, ${t})
        RETURNING *
    `;
    return db.one(sql, {mood, text});
}

module.exports = {
    listTodo,
    createTodo
};

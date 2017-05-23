if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}
const moment = require('moment');
// const todoModel = require('./todos.js');

function accomplishTodo(id) {
    const t = moment().unix();
    const sql = `
        UPDATE todos
        SET "doneTs"=${t}
        WHERE id=$1
        RETURNING *
    `;
    return db.one(sql, [id]);
    /*return new Promise((resolve, reject) => {
        let accomplishedTodo = 0;
        todoModel.listTodo().then(todos => {
            for(let t of todos) {
                if(t.id === id) {
                    t.doneTs = moment().unix();
                    accomplishedTodo = t;
                    break;
                }
            }
            fs.writeFile('data-todos.json', JSON.stringify(todos), err => {
                if (err) reject(err);

                resolve(accomplishedTodo);
            });
        });

    });*/
}
module.exports = {
    accomplishTodo
};

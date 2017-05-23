const express = require('express');
const bodyParser = require('body-parser');

const todoModel = require('../model/todos.js');
const accomplishModel = require('../model/accomplish.js');
const accessController = require('../middleware/access-controller.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

// List Todo
router.get('/todos', function(req, res) {

    const {unaccomplishedOnly, start, searchText}=req.query;

    todoModel.listTodo(unaccomplishedOnly, searchText, start).then(todos => {
        res.json(todos);
    });
});

// Create todos
router.post('/todos', function(req, res) {
    const {mood, text} = req.body;
    if (!mood || !text) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    todoModel.createTodo(mood, text).then(todo => {
        res.json(todo);
    });
});

// Accomplish todo
router.post('/todos/:id', function(req, res) {
    const {id} = req.params;
    if (!id ) {
        const err = new Error('Todo ID are required');
        err.status = 400;
        throw err;
    }
    accomplishModel.accomplishTodo(id).then(todo => {
        res.json(todo);
    });
});

module.exports = router;

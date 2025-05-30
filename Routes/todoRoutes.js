const express = require('express');
const router = express.Router();
const {createTask, getTasks, toggleTask, updateTasks, deleteTask } = require('../Controllers/todoController');

router.post('/create' , createTask);
router.get('/' , getTasks);
router.patch('/toggle/:id' , toggleTask);
router.patch('/update/:id' , updateTasks);
router.delete('/:id' , deleteTask);

module.exports = router
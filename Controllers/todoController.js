const Task = require("../Models/todoModel");

//Create A Task
const createTask = async (req, res) => {
  try {
    const { title, dueTime } = req.body;
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title Is Required",
      });
    }

    const task = await Task.create({
      title,
      dueTime: dueTime ? new Date(dueTime) : null,
    });

    res.status(201).json({
      success: true,
      message: "Task Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//list Tasks
const getTasks = async (req, res) => {
  try {
    const alltasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Fetched All Tasks",
      data: alltasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

//Toggle Tasks
const toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task Not Found",
      });
    }

    task.completed = !task.completed;

    await task.save();
    res.status(200).json({
      success: true,
      message: "Task status Toggled",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

//Update Tasks
const updateTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task Not Found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

//Delete Task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task Not Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Deleted The Task",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

module.exports = { createTask, getTasks, toggleTask, updateTasks, deleteTask };

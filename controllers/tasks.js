const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200);
    res.json({ tasks });
  } catch (error) {
    res.status(500);
    res.json({ error });
    console.log(error);
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500);
    res.json({ error });
    console.log(error);
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    res.status(200);

    if (!task) {
      return res.status(404).json({ msg: `no task with id: ${taskID}` });
    }

    res.json({ task });
  } catch (error) {
    res.json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `no task with id: ${taskID}` });
    }
    res.status(200);
    res.json({ task });
  } catch (error) {
    res.json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ msg: `no task with id: ${taskID}` });
    }

    res.status(200);
    res.json({ task });
  } catch (error) {
    return res.status(404).json({ msg: `no task with id: ${taskID}` });
  }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };

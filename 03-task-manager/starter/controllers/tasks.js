import Task from "../models/task.js";

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(400).json({ success: false, msg: "Couldn't get the tasks" });
  }
};

const createTask = async (req, res) => {
  try {
    const createdTask = await Task.create(req.body);
    res.status(201).json({ createdTask });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.errors.name.message });
  }
};

const getSingleTask = async (req, res) => {
  const { id: taskId } = req.params; // { id: taskId } <-- alias
  try {
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, msg: `No task with id: ${taskId}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const data = req.body;

    const task = await Task.findOneAndUpdate({ _id: taskId }, data, {
      new: true, // returns the updated one
      runValidators: true, // runs validation
    });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, msg: `No task with id: ${taskId}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, msg: `No task with id: ${taskId}` });
    }
    res.status(200).json({ task: null, status: "success" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

export { getAllTasks, createTask, getSingleTask, updateTask, deleteTask };

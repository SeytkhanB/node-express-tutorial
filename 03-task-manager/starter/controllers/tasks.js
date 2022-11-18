import Task from "../models/task.js";
import asyncWrapper from "../middleware/async.js";
import { createCustomError } from "../errors/custom-error.js";

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const createdTask = await Task.create(req.body);
  res.status(201).json({ createdTask });
});

const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params; // { id: taskId } <-- alias
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const data = req.body;

  const task = await Task.findOneAndUpdate({ _id: taskId }, data, {
    new: true, // returns the updated one
    runValidators: true, // runs validation
  });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404));
  }
  res.status(200).json({ task: null, status: "success" });
});

export { getAllTasks, createTask, getSingleTask, updateTask, deleteTask };

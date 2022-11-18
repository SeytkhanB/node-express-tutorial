import {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.js";
import express from "express";
const router = express.Router();

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTask);

export default router;

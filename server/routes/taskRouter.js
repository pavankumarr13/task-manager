import { Router } from "express";
import {
  fetchTasks,
  getAddTask,
  postAddTask,
  getUpdateTask,
  patchUpdateTask,
  deleteTask,
} from "../controllers/taskController.js";
import verify from "../middleware.js";
// let token = localStorage.getItem

let router = Router();

// Read all tasks
// Protected route
router.get("/", verify, fetchTasks); // Home page

// router.get('/',fetchTasks);

// Adding task
// router.get('/task/addTask',getAddTask);

router.post("/addTask", verify, postAddTask);

// Update
// router.get('./task/updateTask/',getUpdateTask);
router.patch("/updateTask/:id", verify, patchUpdateTask);

// Delete task
router.delete("/:id", verify, deleteTask);

export default router;

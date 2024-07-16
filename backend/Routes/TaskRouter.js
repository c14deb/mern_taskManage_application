const {
  createTask,
  allTasks,
  updateTaskById,
  deleteTaskById,
} = require("../Controllers/TaskController");

const router = require("express").Router();

router.post("/", createTask);
router.get("/", allTasks);
router.put("/:id", updateTaskById);
router.delete("/:id", deleteTaskById);

module.exports = router;

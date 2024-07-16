const TaskModel = require("../Models/TaskModels");

const createTask = async (req, res) => {
  const data = req.body;
  try {
    const model = new TaskModel(data);
    await model.save();
    return res.status(200).json({ message: "task is created", success: true });
  } catch (error) {
    res.status(500).json({ message: "failed to create task", success: false });
  }
};

const allTasks = async (req, res) => {
  try {
    const data = await TaskModel.find({});
    res.status(200).json({ message: "All Tasks", success: true, data });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get all tasks", success: false });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const obj = { $set: { ...body } };
    await TaskModel.findByIdAndUpdate(id, obj);
    res.status(200).json({ message: "task is updated", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get all tasks", success: false });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    await TaskModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "task is deleted", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to delete the task", success: false });
  }
};

module.exports = {
  createTask,
  allTasks,
  updateTaskById,
  deleteTaskById,
};

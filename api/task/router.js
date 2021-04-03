// build your `/api/tasks` router here
const express = require("express");

const TasksModel = require("./model.js");

const TasksRouter = express.Router();

TasksRouter.get("/", (req, res) => {
  TasksModel.findTasks()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get tasks" });
    });
});

TasksRouter.post("/", (req, res) => {
  const taskData = req.body;

  TasksModel.addTask(taskData)
    .then((task) => {
      res.status(201).json(task);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create new task" });
    });
});

module.exports = TasksRouter;
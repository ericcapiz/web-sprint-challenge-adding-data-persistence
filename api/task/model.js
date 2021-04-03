// build your `Task` model here
const db = require("../../data/dbConfig.js");

module.exports = {
  findTasks,
  findById,
  addTask,
};

async function findTasks() {
  try {
    const tasks = await db("tasks")
      .join("projects", "tasks.project_id", "projects.id")
      .select(
        "project_name",
        "project_description",
        "task_description",
        "task_notes",
        "task_completed"
        // "tasks.project_id"
      );
    return tasks;
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    const task = await db("tasks").where({ id }).first();
    return task;
  } catch (err) {
    throw err;
  }
}

async function addTask(taskData) {
  try {
    const ids = await db("tasks").insert(taskData);
    const newTask = await findById(ids[0]);
    return newTask;
  } catch (err) {
    throw err;
  }
}
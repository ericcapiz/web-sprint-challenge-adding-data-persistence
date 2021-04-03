const db = require("../../data/dbConfig.js");

module.exports = {
  findProjects,
  findById,
  addProject,
};

async function findProjects() {
  try {
    return await db("projects");
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    const project = await db("projects").where({ id }).first();
    return project;
  } catch (err) {
    throw err;
  }
}

async function addProject(projectData) {
  try {
    const ids = await db("projects").insert(projectData);
    const newProject = await findById(ids[0]);
    return newProject;
  } catch (err) {
    throw err;
  }
}
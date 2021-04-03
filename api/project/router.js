// build your `/api/projects` router here
const express = require("express");

const ProjectsModel = require("./model.js");

const ProjectsRouter = express.Router();

ProjectsRouter.get("/", (req, res) => {
  ProjectsModel.findProjects()
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get projects" });
    });
});

ProjectsRouter.post("/", (req, res) => {
  const projectData = req.body;

  ProjectsModel.addProject(projectData)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create new project" });
    });
});

module.exports = ProjectsRouter;
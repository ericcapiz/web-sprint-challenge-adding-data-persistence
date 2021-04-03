// build your `/api/resources` router here
const express = require("express");

const ResourcesModel = require("./model.js");

const ResourcesRouter = express.Router();

ResourcesRouter.get("/", (req, res) => {
  ResourcesModel.findResources()
    .then((resources) => {
      res.json(resources);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get resources" });
    });
});

ResourcesRouter.post("/", (req, res) => {
  const resourceData = req.body;

  ResourcesModel.addResource(resourceData)
    .then((resource) => {
      res.status(201).json(resource);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create new resource" });
    });
});

module.exports = ResourcesRouter;
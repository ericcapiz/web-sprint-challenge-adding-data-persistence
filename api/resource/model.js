// build your `Resource` model here
const db = require("../../data/dbConfig");

module.exports = {
  findResources,
  findById,
  addResource,
};

async function findResources() {
  try {
    return await db("resources");
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    const resource = await db("resources").where({ id }).first();
    return resource;
  } catch (err) {
    throw err;
  }
}

async function addResource(resourceData) {
  try {
    const ids = await db("resources").insert(resourceData);
    const newResource = await findById(ids[0]);
    return newResource;
  } catch (err) {
    throw err;
  }
}
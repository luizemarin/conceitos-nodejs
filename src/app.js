const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(cors());
app.use(express.json());

const repositories = [];

app.get("/repositories", (req, res) => {
  const { title } = req.query;
  const result = title
    ? repositories.filter((repo) => repo.title.includes(title))
    : repositories;

  return res.json(result);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const result = { id: uuid(), title, url, techs, like: 0 };

  repositories.push(result);
  return res.json(repositories);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex < 0) {
    return res.status(400).json({ error: "Repository not found" });
  }

  const repository = { id, title, url, techs };

  repositories[repoIndex] = repository;
  return res.json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex < 0) {
    return res.status(400).json({ error: "Repository not found" });
  }

  repositories.splice(repoIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (!repoIndex) {
    return res.status(400).json({ error: "Repository not found" });
  }

  repository.like += 1;

  return res.json(repository);
});

module.exports = app;

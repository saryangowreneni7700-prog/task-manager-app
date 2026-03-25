console.log("Starting server...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/taskdb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const TaskSchema = new mongoose.Schema({
  text: String
});

const Task = mongoose.model("Task", TaskSchema);

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const task = new Task({ text: req.body.text });
  await task.save();
  res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

app.listen(5000, () => console.log("Server running on port 5000"));
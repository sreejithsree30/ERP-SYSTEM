import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Define a Task schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  scheduleTime: { type: Date, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
});


const Task = mongoose.model("Task", taskSchema);

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});


router.post("/", async (req, res) => {
  const { title, description, scheduleTime } = req.body;

  if (!title || !scheduleTime) {
    return res.status(400).json({ error: "error" });
  }

  try {
    const newTask = new Task({ title, description, scheduleTime });
    await newTask.save();
    res.status(201).json({ message: "Task added to scheduler", data: newTask });
  } catch (error) {
    res.status(400).json({ error: "Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: `Task ${id} deleted`, data: deletedTask });
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

export default router;

import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Define a Setup Master schema
const setupMasterSchema = new mongoose.Schema({
  configName: { type: String, required: true },
  configValue: { type: mongoose.Schema.Types.Mixed, required: true },
});

const SetupMaster = mongoose.model("SetupMaster", setupMasterSchema);


router.get("/", async (req, res) => {
  try {
    const configurations = await SetupMaster.find();
    res.json(configurations);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});


router.put("/", async (req, res) => {
  const { configName, configValue } = req.body;
  if (!configName || configValue === undefined) {
    return res.status(400).json({ error: "Both configName and configValue are required" });
  }

  try {
    const updatedConfiguration = await SetupMaster.findOneAndUpdate(
      { configName },
      { configValue },
      { new: true, upsert: true }
    );
    res.json({ message: "Setup Master updated", data: updatedConfiguration });
  } catch (error) {
    res.status(400).json({ error: "Error" });
  }
});

export default router;

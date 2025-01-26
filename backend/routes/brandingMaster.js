import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const brandingSchema = new mongoose.Schema({
  logoUrl: { type: String, required: true },
  primaryColor: { type: String, required: true },
  secondaryColor: { type: String, required: true },
  footerText: { type: String },
  updatedAt: { type: Date, default: Date.now },
});

const Branding = mongoose.model("Branding", brandingSchema);

router.get("/api/branding", async (req, res) => {
  try {
    const brandingConfig = await Branding.findOne(); 
    if (!brandingConfig) {
      return res.status(404).json({ message: "Branding configurations not found" });
    }
    res.json(brandingConfig);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

router.put("/api/branding", async (req, res) => {
  const { logoUrl, primaryColor, secondaryColor, footerText } = req.body;

  if (!logoUrl || !primaryColor || !secondaryColor) {
    return res.status(400).json({ error: "error" });
  }

  try {
    const updatedConfig = await Branding.findOneAndUpdate(
      {},
      { logoUrl, primaryColor, secondaryColor, footerText, updatedAt: Date.now() },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ message: "Branding configurations updated", data: updatedConfig });
  } catch (error) {
    res.status(400).json({ error: "Error" });
  }
});

export default router;

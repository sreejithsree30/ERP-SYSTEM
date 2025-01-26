import express from "express";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Define the GDN Schema
const gdnSchema = new mongoose.Schema({
  referenceNumber: { type: String, required: true, unique: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  deliveredTo: { type: String, required: true },
  deliveryDate: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Delivered", "Cancelled"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

const GDN = mongoose.model("GDN", gdnSchema);

router.get("/api/gdn", async (req, res) => {
  try {
    const gdns = await GDN.find();
    res.json(gdns);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

router.post("/api/gdn", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { referenceNumber, items, deliveredTo, deliveryDate } = req.body;

    try {
      const newGdn = new GDN({ referenceNumber, items, deliveredTo, deliveryDate });
      const savedGdn = await newGdn.save();
      res.status(201).json(savedGdn);
    } catch (error) {
      res.status(400).json({ error: "Error" });
    }
  }
);


router.put(
  "/api/gdn/:id", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedGdn = await GDN.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedGdn) {
        return res.status(404).json({ message: "GDN not found" });
      }
      res.json(updatedGdn);
    } catch (error) {
      res.status(400).json({ error: "Error" });
    }
  }
);

router.delete("/api/gdn/:id", async (req, res) => {
  try {
    const deletedGdn = await GDN.findByIdAndDelete(req.params.id);
    if (!deletedGdn) {
      return res.status(404).json({ message: "GDN not found" });
    }
    res.json({ message: `GDN ${req.params.id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

export default router;

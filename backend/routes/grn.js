import express from "express";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Define the GRN Schema
const grnSchema = new mongoose.Schema({
  referenceNumber: { type: String, required: true, unique: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  receivedFrom: { type: String, required: true },
  receiptDate: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Received", "Cancelled"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

const GRN = mongoose.model("GRN", grnSchema);

router.get("/api/grn", async (req, res) => {
  try {
    const grns = await GRN.find();
    res.json(grns);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

router.post(
  "/api/grn",async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { referenceNumber, items, receivedFrom, receiptDate } = req.body;

    try {
      const newGrn = new GRN({ referenceNumber, items, receivedFrom, receiptDate });
      const savedGrn = await newGrn.save();
      res.status(201).json(savedGrn);
    } catch (error) {
      res.status(400).json({ error: "Error" });
    }
  }
);

router.put(
  "/api/grn/:id",async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedGrn = await GRN.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedGrn) {
        return res.status(404).json({ message: "GRN not found" });
      }
      res.json(updatedGrn);
    } catch (error) {
      res.status(400).json({ error: "Error updating GRN" });
    }
  }
);


router.delete("/api/grn/:id", async (req, res) => {
  try {
    const deletedGrn = await GRN.findByIdAndDelete(req.params.id);
    if (!deletedGrn) {
      return res.status(404).json({ message: "GRN not found" });
    }
    res.json({ message: `GRN ${req.params.id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

export default router;

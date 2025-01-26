import express from "express";
import mongoose from "mongoose";

const router = express.Router();


const stockSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

const Stock = mongoose.model("Stock", stockSchema);


router.get("/", async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

router.put("/", async (req, res) => {
  const { itemName, quantity, location } = req.body;

  if (!itemName || quantity === undefined || !location) {
    return res.status(400).json({ error: "error" });
  }

  try {
    const updatedStock = await Stock.findOneAndUpdate(
      { itemName },
      { quantity, location, lastUpdated: new Date() },
      { new: true, upsert: true } 
    );
    res.json({ message: "Stock details updated", data: updatedStock });
  } catch (error) {
    res.status(400).json({ error: "Error" });
  }
});

export default router;

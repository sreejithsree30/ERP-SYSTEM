import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const purchaseOrderSchema = new mongoose.Schema({
  poNumber: { type: String, required: true },
  supplier: { type: String, required: true },
  orderDate: { type: Date, required: true },
  expectedDeliveryDate: { type: Date, required: true },
  items: [
    {
      product: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  status: { type: String, enum: ["Pending", "Approved", "Received", "Cancelled"], default: "Pending" },
});

const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);

router.get("/", async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.find();
    res.json(purchaseOrders);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id);
    if (!purchaseOrder) {
      return res.status(404).json({ error: "Purchase order not found" });
    }
    res.json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});


router.post("/", async (req, res) => {
  try {
    const newPurchaseOrder = new PurchaseOrder(req.body);
    await newPurchaseOrder.save();
    res.status(201).json({ message: "Purchase order created", data: newPurchaseOrder });
  } catch (error) {
    res.status(400).json({ error: "Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPurchaseOrder = await PurchaseOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPurchaseOrder) {
      return res.status(404).json({ error: "Purchase order not found" });
    }
    res.json({ message: "Purchase order updated", data: updatedPurchaseOrder });
  } catch (error) {
    res.status(400).json({ error: "Error" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedPurchaseOrder = await PurchaseOrder.findByIdAndDelete(req.params.id);
    if (!deletedPurchaseOrder) {
      return res.status(404).json({ error: "Purchase order not found" });
    }
    res.json({ message: "Purchase order deleted", data: deletedPurchaseOrder });
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

export default router;

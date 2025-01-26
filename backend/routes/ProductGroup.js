import express from "express"
import mongoose from "mongoose"

const router = express.Router()

const ProductGroupSchema = new mongoose.Schema({
  name: String,
  description: String,
})

const ProductGroup = mongoose.model("ProductGroup", ProductGroupSchema)

// Create
router.post("/api/product-groups", async (req, res) => {
  try {
    const newProductGroup = new ProductGroup(req.body)
    await newProductGroup.save()
    res.status(201).json(newProductGroup)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Read
router.get("/api/product-groups", async (req, res) => {
  try {
    const productGroups = await ProductGroup.find()
    res.json(productGroups)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update
router.put("/api/product-groups/:id", async (req, res) => {
  try {
    const updatedProductGroup = await ProductGroup.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedProductGroup)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete
router.delete("/api/product-groups/:id", async (req, res) => {
  try {
    await ProductGroup.findByIdAndDelete(req.params.id)
    res.json({ message: "Product Group deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router


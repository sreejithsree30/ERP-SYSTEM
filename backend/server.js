import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import productGroupRoutes from "./routes/productGroup.js"
import purchaseOrderRoutes from "./routes/PurchaseOrder.js"
import grnRoutes from "./routes/grn.js"
import gdnRoutes from "./routes/gdn.js"
import setupMasterRoutes from "./routes/setupMaster.js"
import brandingMasterRoutes from "./routes/brandingMaster.js"
import stockManagementRoutes from "./routes/stockManagement.js"
import taskSchedulerRoutes from "./routes/taskScheduler.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err))

app.use("/api/product-groups", productGroupRoutes)
app.use("/api/purchase-orders", purchaseOrderRoutes)
app.use("/api/grn", grnRoutes)
app.use("/api/gdn", gdnRoutes)
app.use("/api/setup", setupMasterRoutes)
app.use("/api/branding", brandingMasterRoutes)
app.use("/api/stock", stockManagementRoutes)
app.use("/api/tasks", taskSchedulerRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


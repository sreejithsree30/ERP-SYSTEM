import React from "react"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import ProductGroups from "./components/ProductGroups"
import PurchaseOrders from "./components/PurchaseOrders"
import GRN from "./components/GRN"
import GDN from "./components/GDN"
import SetupMaster from "./components/SetupMaster"
import BrandingMaster from "./components/BrandingMaster"
import StockManagement from "./components/StockManagement"
import TaskScheduler from "./components/TaskScheduler"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link className="link" to="/product-groups">Product Groups</Link>
            </li>
            <li>
              <Link className="link" to="/purchase-orders">Purchase Orders</Link>
            </li>
            <li>
              <Link className="link" to="/grn">GRN</Link>
            </li>
            <li>
              <Link className="link" to="/gdn">GDN</Link>
            </li>
            <li>
              <Link className="link" to="/setup">Setup Master</Link>
            </li>
            <li>
              <Link className="link" to="/branding">Branding Master</Link>
            </li>
            <li>
              <Link className="link" to="/stock">Stock Management</Link>
            </li>
            <li>
              <Link className="link" to="/tasks">Task Scheduler</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/product-groups" element={<ProductGroups />} />
          <Route path="/purchase-orders" element={<PurchaseOrders />} />
          <Route path="/grn" element={<GRN />} />
          <Route path="/gdn" element={<GDN />} />
          <Route path="/setup" element={<SetupMaster />} />
          <Route path="/branding" element={<BrandingMaster />} />
          <Route path="/stock" element={<StockManagement />} />
          <Route path="/tasks" element={<TaskScheduler />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App


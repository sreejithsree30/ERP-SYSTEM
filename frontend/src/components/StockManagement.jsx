import React, { useState, useEffect } from "react"
import axios from "axios"

const StockManagement = () => {
  const [products, setProducts] = useState([])
  const [lowStockProducts, setLowStockProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products")
      setProducts(response.data)
      setLowStockProducts(response.data.filter((product) => product.currentStock <= product.reorderLevel))
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const handleStockUpdate = async (productId, newStock) => {
    try {
      await axios.put(`http://localhost:5000/api/products/${productId}`, { currentStock: newStock })
      fetchProducts()
    } catch (error) {
      console.error("Error updating stock:", error)
    }
  }

  return (
    <div className="stock-management">
      <h2>Stock Management</h2>
      <h3>All Products</h3>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Current Stock</th>
            <th>Reorder Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.currentStock}</td>
              <td>{product.reorderLevel}</td>
              <td>
                <input
                  type="number"
                  defaultValue={product.currentStock}
                  onBlur={(e) => handleStockUpdate(product._id, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Low Stock Products</h3>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Current Stock</th>
            <th>Reorder Level</th>
          </tr>
        </thead>
        <tbody>
          {lowStockProducts.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.currentStock}</td>
              <td>{product.reorderLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StockManagement


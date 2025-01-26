import React, { useState, useEffect } from "react"
import axios from "axios"

const GRN = () => {
  const [grns, setGrns] = useState([])
  const [newGrn, setNewGrn] = useState({
    purchaseOrderId: "",
    receivedDate: "",
    items: [{ productId: "", quantityReceived: 0 }],
  })

  useEffect(() => {
    fetchGRNs()
  }, [])

  const fetchGRNs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/grn")
      setGrns(response.data)
    } catch (error) {
      console.error("Error fetching GRNs:", error)
    }
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    if (name === "purchaseOrderId" || name === "receivedDate") {
      setNewGrn({ ...newGrn, [name]: value })
    } else {
      const updatedItems = [...newGrn.items]
      updatedItems[index][name] = value
      setNewGrn({ ...newGrn, items: updatedItems })
    }
  }

  const handleAddItem = () => {
    setNewGrn({
      ...newGrn,
      items: [...newGrn.items, { productId: "", quantityReceived: 0 }],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/api/grn", newGrn)
      fetchGRNs()
      setNewGrn({ purchaseOrderId: "", receivedDate: "", items: [{ productId: "", quantityReceived: 0 }] })
    } catch (error) {
      console.error("Error creating GRN:", error)
    }
  }

  return (
    <div className="grn">
      <h2>Goods Received Note</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="purchaseOrderId"
          value={newGrn.purchaseOrderId}
          onChange={(e) => handleInputChange(e)}
          placeholder="Purchase Order ID"
          required
        />
        <input
          type="date"
          name="receivedDate"
          value={newGrn.receivedDate}
          onChange={(e) => handleInputChange(e)}
          required
        />
        {newGrn.items.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              name="productId"
              value={item.productId}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Product ID"
              required
            />
            <input
              type="number"
              name="quantityReceived"
              value={item.quantityReceived}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Quantity Received"
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>
        <button type="submit">Create GRN</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Purchase Order ID</th>
            <th>Received Date</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {grns.map((grn) => (
            <tr key={grn._id}>
              <td>{grn.purchaseOrderId}</td>
              <td>{new Date(grn.receivedDate).toLocaleDateString()}</td>
              <td>
                {grn.items.map((item, index) => (
                  <div key={index}>
                    {item.productId}: {item.quantityReceived}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GRN


import React, { useState, useEffect } from "react"
import axios from "axios"

const GDN = () => {
  const [gdns, setGdns] = useState([])
  const [newGdn, setNewGdn] = useState({
    orderId: "",
    deliveryDate: "",
    items: [{ productId: "", quantityDelivered: 0 }],
  })

  useEffect(() => {
    fetchGDNs()
  }, [])

  const fetchGDNs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/gdn")
      setGdns(response.data)
    } catch (error) {
      console.error("Error fetching GDNs:", error)
    }
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    if (name === "orderId" || name === "deliveryDate") {
      setNewGdn({ ...newGdn, [name]: value })
    } else {
      const updatedItems = [...newGdn.items]
      updatedItems[index][name] = value
      setNewGdn({ ...newGdn, items: updatedItems })
    }
  }

  const handleAddItem = () => {
    setNewGdn({
      ...newGdn,
      items: [...newGdn.items, { productId: "", quantityDelivered: 0 }],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/api/gdn", newGdn)
      fetchGDNs()
      setNewGdn({ orderId: "", deliveryDate: "", items: [{ productId: "", quantityDelivered: 0 }] })
    } catch (error) {
      console.error("Error creating GDN:", error)
    }
  }

  return (
    <div className="gdn">
      <h2>Goods Delivery Note</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="orderId"
          value={newGdn.orderId}
          onChange={(e) => handleInputChange(e)}
          placeholder="Order ID"
          required
        />
        <input
          type="date"
          name="deliveryDate"
          value={newGdn.deliveryDate}
          onChange={(e) => handleInputChange(e)}
          required
        />
        {newGdn.items.map((item, index) => (
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
              name="quantityDelivered"
              value={item.quantityDelivered}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Quantity Delivered"
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>
        <button type="submit">Create GDN</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Delivery Date</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {gdns.map((gdn) => (
            <tr key={gdn._id}>
              <td>{gdn.orderId}</td>
              <td>{new Date(gdn.deliveryDate).toLocaleDateString()}</td>
              <td>
                {gdn.items.map((item, index) => (
                  <div key={index}>
                    {item.productId}: {item.quantityDelivered}
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

export default GDN


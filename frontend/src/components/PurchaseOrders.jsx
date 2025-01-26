import React, { useState, useEffect } from "react";
import axios from "axios";

const PurchaseOrders = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [newPurchaseOrder, setNewPurchaseOrder] = useState({
    poNumber: "",
    supplier: "",
    orderDate: "",
    expectedDeliveryDate: "",
    items: [{ product: "", quantity: "", price: "" }],
    status: "Pending",
  });
  const [editingPurchaseOrder, setEditingPurchaseOrder] = useState(null);

  useEffect(() => {
    fetchPurchaseOrders();
    fetchProducts();
  }, []);

  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/purchase-orders");
      setPurchaseOrders(response.data);
    } catch (error) {
      console.error("Error fetching purchase orders:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const updatedItems = [...newPurchaseOrder.items];
      updatedItems[index] = { ...updatedItems[index], [name]: value };
      setNewPurchaseOrder({ ...newPurchaseOrder, items: updatedItems });
    } else {
      setNewPurchaseOrder({ ...newPurchaseOrder, [name]: value });
    }
  };

  const handleAddItem = () => {
    setNewPurchaseOrder({
      ...newPurchaseOrder,
      items: [...newPurchaseOrder.items, { product: "", quantity: "", price: "" }],
    });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = newPurchaseOrder.items.filter((_, i) => i !== index);
    setNewPurchaseOrder({ ...newPurchaseOrder, items: updatedItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPurchaseOrder) {
        await axios.put(
          `http://localhost:5000/api/purchase-orders/${editingPurchaseOrder._id}`,
          newPurchaseOrder
        );
      } else {
        await axios.post("http://localhost:5000/api/purchase-orders", newPurchaseOrder);
      }
      fetchPurchaseOrders();
      setNewPurchaseOrder({
        poNumber: "",
        supplier: "",
        orderDate: "",
        expectedDeliveryDate: "",
        items: [{ product: "", quantity: "", price: "" }],
        status: "Pending",
      });
      setEditingPurchaseOrder(null);
    } catch (error) {
      console.error("Error saving purchase order:", error);
    }
  };

  const handleEdit = (purchaseOrder) => {
    setEditingPurchaseOrder(purchaseOrder);
    setNewPurchaseOrder({
      poNumber: purchaseOrder.poNumber,
      supplier: purchaseOrder.supplier,
      orderDate: purchaseOrder.orderDate.split("T")[0],
      expectedDeliveryDate: purchaseOrder.expectedDeliveryDate.split("T")[0],
      items: purchaseOrder.items,
      status: purchaseOrder.status,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/purchase-orders/${id}`);
      fetchPurchaseOrders();
    } catch (error) {
      console.error("Error deleting purchase order:", error);
    }
  };

  return (
    <div className="purchase-orders">
      <h2>Purchase Orders</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="poNumber"
          value={newPurchaseOrder.poNumber}
          onChange={handleInputChange}
          placeholder="PO Number"
          required
        />
        <input
          type="text"
          name="supplier"
          value={newPurchaseOrder.supplier}
          onChange={handleInputChange}
          placeholder="Supplier"
          required
        />
        <input
          type="date"
          name="orderDate"
          value={newPurchaseOrder.orderDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="expectedDeliveryDate"
          value={newPurchaseOrder.expectedDeliveryDate}
          onChange={handleInputChange}
          required
        />
        {newPurchaseOrder.items.map((item, index) => (
          <div key={index}>
            <select
              name="product"
              value={item.product}
              onChange={(e) => handleInputChange(e, index)}
              required
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Quantity"
              required
            />
            <input
              type="number"
              name="price"
              value={item.price}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Price"
              required
            />
            <button type="button" onClick={() => handleRemoveItem(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddItem}>Add Item</button>
        <select
          name="status"
          value={newPurchaseOrder.status}
          onChange={handleInputChange}
          required
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Received">Received</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button type="submit">{editingPurchaseOrder ? "Update" : "Add"} Purchase Order</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>PO Number</th>
            <th>Supplier</th>
            <th>Order Date</th>
            <th>Expected Delivery</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrders.map((po) => (
            <tr key={po._id}>
              <td>{po.poNumber}</td>
              <td>{po.supplier}</td>
              <td>{new Date(po.orderDate).toLocaleDateString()}</td>
              <td>{new Date(po.expectedDeliveryDate).toLocaleDateString()}</td>
              <td>{po.status}</td>
              <td>
                <button onClick={() => handleEdit(po)}>Edit</button>
                <button onClick={() => handleDelete(po._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseOrders;

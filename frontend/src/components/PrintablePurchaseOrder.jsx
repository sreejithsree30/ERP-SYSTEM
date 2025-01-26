import React from "react"

const PrintablePurchaseOrder = React.forwardRef((props, ref) => {
  const { purchaseOrder } = props

  return (
    <div ref={ref} className="printable-purchase-order">
      <h2>Purchase Order: {purchaseOrder.poNumber}</h2>
      <p>Supplier: {purchaseOrder.supplier}</p>
      <p>Order Date: {new Date(purchaseOrder.orderDate).toLocaleDateString()}</p>
      <p>Expected Delivery: {new Date(purchaseOrder.expectedDeliveryDate).toLocaleDateString()}</p>
      <p>Status: {purchaseOrder.status}</p>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrder.items.map((item, index) => (
            <tr key={index}>
              <td>{item.product.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total: {purchaseOrder.items.reduce((total, item) => total + item.quantity * item.price, 0)}</p>
    </div>
  )
})

export default PrintablePurchaseOrder


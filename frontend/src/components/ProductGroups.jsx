import React, { useState, useEffect } from "react"
import axios from "axios"

const ProductGroups = () => {
  const [productGroups, setProductGroups] = useState([])
  const [newGroup, setNewGroup] = useState({ name: "", description: "" })
  const [editingGroup, setEditingGroup] = useState(null)

  useEffect(() => {
    fetchProductGroups()
  }, [])

  const fetchProductGroups = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/product-groups")
      setProductGroups(response.data)
    } catch (error) {
      console.error("Error fetching product groups:", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewGroup({ ...newGroup, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingGroup) {
        await axios.put(`http://localhost:5000/api/product-groups/${editingGroup._id}`, newGroup)
      } else {
        await axios.post("http://localhost:5000/api/product-groups", newGroup)
      }
      fetchProductGroups()
      setNewGroup({ name: "", description: "" })
      setEditingGroup(null)
    } catch (error) {
      console.error("Error saving product group:", error)
    }
  }

  const handleEdit = (group) => {
    setEditingGroup(group)
    setNewGroup({ name: group.name, description: group.description })
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/product-groups/${id}`)
      fetchProductGroups()
    } catch (error) {
      console.error("Error deleting product group:", error)
    }
  }

  return (
    <div className="product-groups">
      <h2>Product Groups</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newGroup.name}
          onChange={handleInputChange}
          placeholder="Group Name"
          required
        />
        <input
          type="text"
          name="description"
          value={newGroup.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <button type="submit">{editingGroup ? "Update" : "Add"} Group</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productGroups.map((group) => (
            <tr key={group._id}>
              <td>{group.name}</td>
              <td>{group.description}</td>
              <td>
                <button onClick={() => handleEdit(group)}>Edit</button>
                <button onClick={() => handleDelete(group._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductGroups


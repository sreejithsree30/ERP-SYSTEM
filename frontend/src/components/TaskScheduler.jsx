import React, { useState, useEffect } from "react"
import axios from "axios"

const TaskScheduler = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  })

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks")
      setTasks(response.data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewTask({ ...newTask, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/api/tasks", newTask)
      fetchTasks()
      setNewTask({ title: "", description: "", dueDate: "", status: "Pending" })
    } catch (error) {
      console.error("Error creating task:", error)
    }
  }

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, { status: newStatus })
      fetchTasks()
    } catch (error) {
      console.error("Error updating task status:", error)
    }
  }

  return (
    <div className="task-scheduler">
      <h2>Task Scheduler</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Task Title"
          required
        />
        <textarea
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Task Description"
          required
        />
        <input type="date" name="dueDate" value={newTask.dueDate} onChange={handleInputChange} required />
        <button type="submit">Add Task</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{new Date(task.dueDate).toLocaleDateString()}</td>
              <td>{task.status}</td>
              <td>
                <select value={task.status} onChange={(e) => handleStatusChange(task._id, e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TaskScheduler


import React, { useState, useEffect } from "react"
import axios from "axios"

const SetupMaster = () => {
  const [settings, setSettings] = useState({
    quotationPrefix: "",
    invoicePrefix: "",
    purchaseOrderPrefix: "",
    grnPrefix: "",
    gdnPrefix: "",
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/setup")
      setSettings(response.data)
    } catch (error) {
      console.error("Error fetching settings:", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSettings({ ...settings, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/api/setup", settings)
      alert("Settings updated successfully")
    } catch (error) {
      console.error("Error updating settings:", error)
    }
  }

  return (
    <div className="setup-master">
      <h2>Setup Master</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="quotationPrefix">Quotation Prefix:</label>
          <input
            type="text"
            id="quotationPrefix"
            name="quotationPrefix"
            value={settings.quotationPrefix}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="invoicePrefix">Invoice Prefix:</label>
          <input
            type="text"
            id="invoicePrefix"
            name="invoicePrefix"
            value={settings.invoicePrefix}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="purchaseOrderPrefix">Purchase Order Prefix:</label>
          <input
            type="text"
            id="purchaseOrderPrefix"
            name="purchaseOrderPrefix"
            value={settings.purchaseOrderPrefix}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="grnPrefix">GRN Prefix:</label>
          <input type="text" id="grnPrefix" name="grnPrefix" value={settings.grnPrefix} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="gdnPrefix">GDN Prefix:</label>
          <input type="text" id="gdnPrefix" name="gdnPrefix" value={settings.gdnPrefix} onChange={handleInputChange} />
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  )
}

export default SetupMaster


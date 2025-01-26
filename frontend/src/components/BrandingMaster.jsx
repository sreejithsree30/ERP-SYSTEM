import React, { useState, useEffect } from "react"
import axios from "axios"

const BrandingMaster = () => {
  const [branding, setBranding] = useState({
    companyName: "",
    logo: "",
    address: "",
    phone: "",
    email: "",
    website: "",
  })

  useEffect(() => {
    fetchBranding()
  }, [])

  const fetchBranding = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/branding")
      setBranding(response.data)
    } catch (error) {
      console.error("Error fetching branding:", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBranding({ ...branding, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/api/branding", branding)
      alert("Branding updated successfully")
    } catch (error) {
      console.error("Error updating branding:", error)
    }
  }

  return (
    <div className="branding-master">
      <h2>Branding Master</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={branding.companyName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="logo">Logo URL:</label>
          <input type="text" id="logo" name="logo" value={branding.logo} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <textarea id="address" name="address" value={branding.address} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" value={branding.phone} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={branding.email} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="website">Website:</label>
          <input type="url" id="website" name="website" value={branding.website} onChange={handleInputChange} />
        </div>
        <button type="submit">Save Branding</button>
      </form>
    </div>
  )
}

export default BrandingMaster


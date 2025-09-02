"use client";
import { useState } from "react";

export default function AddSchool() {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        contact: "",
        image: "",
        email_id: "",
    });

    const [message, setMessage] = useState("");

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Saving...");

        try {
            const res = await fetch("/api/schools", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setMessage("✅ School added successfully!");
                setFormData({
                    name: "",
                    address: "",
                    city: "",
                    state: "",
                    contact: "",
                    image: "",
                    email_id: "",
                });
            } else {
                setMessage("❌ Failed to add school.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("⚠️ Something went wrong.");
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
            <h1>Add School</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="School Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="contact"
                    placeholder="Contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email_id"
                    placeholder="Email"
                    value={formData.email_id}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add School</button>
            </form>
            <p>{message}</p>

            <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        input,
        button {
          padding: 10px;
          font-size: 16px;
        }
        button {
          background: blue;
          color: white;
          border: none;
          cursor: pointer;
        }
      `}</style>
        </div>
    );
}


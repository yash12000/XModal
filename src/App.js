import React, { useState } from "react";
import "./styles.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    let errors = [];

    const phoneNumber = formData.phone.trim();
    if (phoneNumber.length !== 10 || !/^\d{10}$/.test(phoneNumber)) {
      errors.push(
        "Invalid phone number. Please enter a 10-digit phone number."
      );
    }

    if (!formData.username) {
      errors.push("Username is required.");
    }

    if (!formData.email.includes("@")) {
      errors.push("Invalid email. Please check your email address.");
    }

    if (!formData.dob) {
      errors.push("Date of Birth is required.");
    } else {
      const today = new Date().setHours(0, 0, 0, 0);
      const dob = new Date(formData.dob).setHours(0, 0, 0, 0);

      if (dob > today) {
        errors.push(
          "Invalid date of birth. Date of birth cannot be in the future."
        );
      }
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (formErrors.length === 0) {
      setIsModalOpen(false);
      setFormData({ username: "", email: "", phone: "", dob: "" });
    } else {
      alert(formErrors[0]);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app">
      <h1 className="main-heading">User Details Modal</h1>
      <button className="open-button" onClick={() => setIsModalOpen(true)}>
        Open Form
      </button>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-heading">Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <h4 className="details-heading">Username:</h4>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                />
              </div>
              <div>
                <h4 className="details-heading">Email Address:</h4>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter valid email"
                />
              </div>
              <div>
                <h4 className="details-heading">Phone Number:</h4>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter 10-digit phone number"
                />
              </div>
              <div>
                <h4 className="details-heading">Date of Birth:</h4>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
              <button className="submit-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function AddContact() {
  // adding name, email and navigate to redirect to contact list page
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleAdd = async () => {
    if (name && email) {
      try {
        const newContact = { id: uuidv4(), name, email };
        await axios.post("http://localhost:5000/contacts", newContact);

        const localContacts =
          JSON.parse(localStorage.getItem("contacts")) || [];
        localContacts.push(newContact);
        localStorage.setItem("contacts", JSON.stringify(localContacts));

        navigate("/contact-list");
      } catch (error) {
        console.error("Error adding contact:", error);
      }
    } else {
      alert("Both fields are required!");
    }
  };

  return (
    <div>
      <h2>Add Your Name and Email id </h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

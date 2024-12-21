import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditContact() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/contacts/${id}`
        );
        setName(response.data.name);
        setEmail(response.data.email);

        // Update localStorage
        const localContacts =
          JSON.parse(localStorage.getItem("contacts")) || [];
        const contact = localContacts.find((contact) => contact.id === id);
        if (contact) {
          setName(contact.name);
          setEmail(contact.email);
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };
    fetchContact();
  }, [id]);

  const handleEdit = async () => {
    if (name && email) {
      try {
        const updatedContact = { id, name, email };
        await axios.put(`http://localhost:5000/contacts/${id}`, updatedContact);

        const localContacts =
          JSON.parse(localStorage.getItem("contacts")) || [];
        const updatedLocalContacts = localContacts.map((contact) =>
          contact.id === id ? updatedContact : contact
        );
        localStorage.setItem("contacts", JSON.stringify(updatedLocalContacts));

        navigate("/");
      } catch (error) {
        console.error("Error editing contact:", error);
      }
    } else {
      alert("Both fields are required!");
    }
  };

  return (
    <div>
      <h2>Edit Contact</h2>
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
      <button onClick={handleEdit}>Save</button>
    </div>
  );
}

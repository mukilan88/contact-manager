import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ContactCard } from "../ContactCard";
import axios from "axios";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/contacts");
        setContacts(response.data);

        // Sync with localStorage
        localStorage.setItem("contacts", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/contacts/${id}`);
      const updatedContacts = contacts.filter((contact) => contact.id !== id);
      setContacts(updatedContacts);

      // Update localStorage
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Contact List</h2>
      <div>
        <input
          type="text"
          placeholder="Search Contacts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span role="img" aria-label="search">
          🔍
        </span>
      </div>
      <Link to="/">Add Contact</Link>
      {filteredContacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

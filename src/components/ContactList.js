import React, { useState, useEffect } from "react";
// Import React, useState for managing state, and useEffect for side effects like fetching data.

import { Link } from "react-router-dom";
// Import Link for navigation between pages.

import { ContactCard } from "../ContactCard";
// Import ContactCard component to display individual contact details.

import axios from "axios";
// Import axios for making HTTP requests to the backend.

export default function ContactList() {
  // Define the ContactList functional component.

  const [contacts, setContacts] = useState([]);
  // State to store the list of contacts.

  const [search, setSearch] = useState("");
  // State to store the search query entered by the user.

  useEffect(() => {
    // useEffect runs once when the component mounts to fetch contacts.
    const fetchContacts = async () => {
      // Function to fetch contacts from the backend.
      try {
        const response = await axios.get("http://localhost:5000/contacts");
        // Send a GET request to fetch the contacts from the backend.

        setContacts(response.data);
        // Store the fetched contacts in the `contacts` state.

        localStorage.setItem("contacts", JSON.stringify(response.data));
        // Sync fetched contacts with localStorage for persistence.
      } catch (error) {
        console.error("Error fetching contacts:", error);
        // Log an error message if fetching fails.
      }
    };
    fetchContacts();
    // Call the function to fetch contacts.
  }, []);
  // Empty dependency array ensures this runs only once when the component mounts.

  const handleDelete = async (id) => {
    // Function to delete a contact by its ID.
    try {
      await axios.delete(`http://localhost:5000/contacts/${id}`);
      // Send a DELETE request to the backend to remove the contact.

      const updatedContacts = contacts.filter((contact) => contact.id !== id);
      // Filter out the deleted contact from the `contacts` array.

      setContacts(updatedContacts);
      // Update the state to reflect the new list of contacts.

      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      // Update localStorage to reflect the new list.
    } catch (error) {
      console.error("Error deleting contact:", error);
      // Log an error message if deletion fails.
    }
  };

  const filteredContacts = contacts.filter(
    // Filter contacts based on the search query entered by the user.
    (contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      // Check if the contact name includes the search query (case-insensitive).
      contact.email.toLowerCase().includes(search.toLowerCase())
    // Check if the contact email includes the search query (case-insensitive).
  );

  return (
    <div>
      <h2>Contact List</h2>
      {/* Display a heading for the contact list page. */}

      <div>
        <input
          type="text"
          placeholder="Search Contacts"
          value={search}
          // Bind the search input to the `search` state.
          onChange={(e) => setSearch(e.target.value)}
          // Update the `search` state whenever the user types in the input.
        />
        <span role="img" aria-label="search">
          🔍
          {/* Add a search icon for better user experience. */}
        </span>
      </div>

      <Link to="/">Add Contact</Link>
      {/* Navigation link to redirect the user to the Add Contact page. */}

      {filteredContacts.map((contact) => (
        // Loop through the filtered contacts and render a ContactCard for each one.
        <ContactCard
          key={contact.id}
          // Provide a unique key to help React efficiently update the DOM.

          contact={contact}
          // Pass the contact object as a prop to the ContactCard.

          onDelete={handleDelete}
          // Pass the handleDelete function as a prop to handle contact deletion.
        />
      ))}
    </div>
  );
}

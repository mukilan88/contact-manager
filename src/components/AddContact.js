import React, { useState } from "react";
// Import React and useState for managing component state.

import { useNavigate } from "react-router-dom";
// Import useNavigate for programmatically navigating to another page.

import { v4 as uuidv4 } from "uuid";
// Import uuid to generate unique IDs for each new contact.

import axios from "axios";
// Import axios for making HTTP requests to the backend.

export default function AddContact() {
  // Define the AddContact functional component.

  const [name, setName] = useState("");
  // State to store the name input from the user.

  const [email, setEmail] = useState("");
  // State to store the email input from the user.

  const navigate = useNavigate();
  // Hook for navigation, allowing redirection to other pages.

  const handleAdd = async () => {
    // Function to handle adding a new contact.
    if (name && email) {
      // Check if both name and email fields are filled.
      try {
        const newContact = { id: uuidv4(), name, email };
        // Create a new contact object with a unique ID, name, and email.

        await axios.post("http://localhost:5000/contacts", newContact);
        // Send a POST request to save the new contact to the backend (json-server).

        const localContacts =
          JSON.parse(localStorage.getItem("contacts")) || [];
        // Retrieve existing contacts from localStorage or initialize with an empty array.

        localContacts.push(newContact);
        // Add the new contact to the local contacts array.

        localStorage.setItem("contacts", JSON.stringify(localContacts));
        // Save the updated contacts array back to localStorage.

        navigate("/contact-list");
        // Redirect the user to the Contact List page after adding the contact.
      } catch (error) {
        console.error("Error adding contact:", error);
        // Log any errors that occur during the add process.
      }
    } else {
      alert("Both fields are required!");
      // Alert the user if they did not fill in both name and email.
    }
  };

  return (
    <div>
      <h2>Add Your Name and Email id </h2>
      {/* Display a heading for the form. */}

      <input
        type="text"
        placeholder="Name"
        value={name}
        // Bind the input value to the `name` state.
        onChange={(e) => setName(e.target.value)}
        // Update the `name` state whenever the user types in the input.
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        // Bind the input value to the `email` state.
        onChange={(e) => setEmail(e.target.value)}
        // Update the `email` state whenever the user types in the input.
      />
      <button onClick={handleAdd}>Add</button>
      {/* Call `handleAdd` function when the user clicks the "Add" button. */}
    </div>
  );
}

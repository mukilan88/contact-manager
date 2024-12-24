import React, { useState, useEffect } from "react";
// Import React and hooks: useState for state management and useEffect for side effects.

import { useNavigate, useParams } from "react-router-dom";
// Import useNavigate for programmatic navigation and useParams to extract route parameters.

import axios from "axios";
// Import axios for making HTTP requests.

export default function EditContact() {
  // Define the EditContact functional component.

  const { id } = useParams();
  // Extract the `id` parameter from the route URL to identify which contact to edit.

  const [name, setName] = useState("");
  // State to store the name of the contact being edited.

  const [email, setEmail] = useState("");
  // State to store the email of the contact being edited.

  const navigate = useNavigate();
  // Hook for navigation, allowing redirection to another page.

  useEffect(() => {
    // useEffect runs once when the component mounts to fetch the contact details.
    const fetchContact = async () => {
      // Function to fetch contact details from the backend.
      try {
        const response = await axios.get(
          `http://localhost:5000/contacts/${id}`
        );
        // Send a GET request to retrieve the contact with the given ID.

        setName(response.data.name);
        // Set the fetched contact's name in the state.

        setEmail(response.data.email);
        // Set the fetched contact's email in the state.

        const localContacts =
          JSON.parse(localStorage.getItem("contacts")) || [];
        // Retrieve the contacts from localStorage, or initialize an empty array if not found.

        const contact = localContacts.find((contact) => contact.id === id);
        // Find the contact with the matching ID in localStorage.

        if (contact) {
          setName(contact.name);
          // If found, set the contact's name in the state.

          setEmail(contact.email);
          // If found, set the contact's email in the state.
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
        // Log any error that occurs while fetching the contact.
      }
    };
    fetchContact();
    // Call the function to fetch the contact details.
  }, [id]);
  // Run this effect only when the `id` changes.

  const handleEdit = async () => {
    // Function to handle saving the updated contact.
    if (name && email) {
      // Check if both name and email fields are filled.
      try {
        const updatedContact = { id, name, email };
        // Create an object with the updated contact details.

        await axios.put(`http://localhost:5000/contacts/${id}`, updatedContact);
        // Send a PUT request to update the contact in the backend.

        const localContacts =
          JSON.parse(localStorage.getItem("contacts")) || [];
        // Retrieve the contacts from localStorage, or initialize an empty array if not found.

        const updatedLocalContacts = localContacts.map((contact) =>
          contact.id === id ? updatedContact : contact
        );
        // Update the matching contact in the localStorage array.

        localStorage.setItem("contacts", JSON.stringify(updatedLocalContacts));
        // Save the updated contacts array back to localStorage.

        navigate("/");
        // Redirect the user back to the home or contact list page.
      } catch (error) {
        console.error("Error editing contact:", error);
        // Log any error that occurs while editing the contact.
      }
    } else {
      alert("Both fields are required!");
      // Alert the user if either the name or email field is empty.
    }
  };

  return (
    <div>
      <h2>Edit Contact</h2>
      {/* Display a heading for the edit contact page. */}

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
      <button onClick={handleEdit}>Save</button>
      {/* Call the `handleEdit` function when the "Save" button is clicked. */}
    </div>
  );
}

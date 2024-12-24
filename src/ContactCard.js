import React from "react";
// Import React to define a functional component.

import { Link } from "react-router-dom";
// Import Link to navigate to the edit page for a specific contact.

export function ContactCard({ contact, onDelete }) {
  // Define the ContactCard functional component.
  // It receives `contact` (an object with name, email, and id) and `onDelete` (a function to delete a contact) as props.

  return (
    <div>
      <h3>{contact.name}</h3>
      {/* Display the contact's name */}

      <p>{contact.email}</p>
      {/* Display the contact's email */}

      <Link to={`/edit/${contact.id}`}>Edit</Link>
      {/* Link to the Edit Contact page for the specific contact.
          The `id` is dynamically added to the route. */}

      <button onClick={() => onDelete(contact.id)}>Delete</button>
      {/* A button that calls the `onDelete` function when clicked.
          Passes the contact's `id` to the parent component for deletion. */}
    </div>
  );
}
